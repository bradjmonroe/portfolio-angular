// netlify/functions/email.ts
import type { Handler } from '@netlify/functions';

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || '';
const RESEND_API_KEY   = process.env.RESEND_API_KEY || '';
const TO_EMAIL         = process.env.TO_EMAIL || 'bradleyjmonroe@gmail.com';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' });
  }

  let body: any = {};
  try { body = JSON.parse(event.body || '{}'); } catch {}

  const { name, email, message, turnstileToken, elapsedMs } = body;

  // Basic validation
  if (!name || !email || !message) return json(400, { ok: false, error: 'Missing fields' });
  if ((elapsedMs ?? 0) < 3000)     return json(400, { ok: false, error: 'Too fast' });
  if (!turnstileToken)             return json(400, { ok: false, error: 'Missing challenge token' });

  // Verify Turnstile
  const ip =
    (event.headers['x-nf-client-connection-ip'] ||
     event.headers['x-forwarded-for'] || '').toString();

  const verifyResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: turnstileToken,
      remoteip: ip
    })
  });
  const verify = await verifyResp.json() as { success: boolean };
  if (!verify.success) return json(400, { ok: false, error: 'Challenge failed' });

  // Send via Resend
  const emailResp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <noreply@yourdomain.dev>',
      to: [TO_EMAIL],
      subject: `New message from ${name}`,
      reply_to: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
             <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
    })
  });

  if (!emailResp.ok) {
    const detail = await emailResp.text();
    return json(502, { ok: false, error: 'Email failed', detail });
  }

  return json(200, { ok: true });
};

function json(status: number, body: unknown) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
