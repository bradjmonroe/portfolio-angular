import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(payload: { name: string; email: string; message: string }) {

    // TODO: hook to Netlify Functions, API, or Email API
    await new Promise(r => setTimeout(r, 600));
    return { ok: true };
  }
}
