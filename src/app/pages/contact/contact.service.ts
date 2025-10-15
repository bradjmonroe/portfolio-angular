import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(payload: {
    name: string; email: string; message: string;
    turnstileToken: string; elapsedMs: number;
  }) {
    const res = await fetch('/.netlify/functions/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) return { ok: false };
    return res.json();
  }
}
