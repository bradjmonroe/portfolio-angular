import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  form!: FormGroup;
  sending = false;
  sent = false;
  startedAt = 0; // time-trap

  private onTurnstile = (e: Event) => {
    const token = (e as CustomEvent<string>).detail;
    this.form.get('turnstileToken')?.setValue(token);
  };

  constructor(private fb: FormBuilder, private svc: ContactService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      hp: [''],
      turnstileToken: ['']
    });

    // listen for the browser event fired from index.html
    window.addEventListener('turnstile:solved', this.onTurnstile);
  }

  ngOnDestroy() {
    window.removeEventListener('turnstile:solved', this.onTurnstile);
  }

  async submit() {
    if (this.form.invalid) return;

    // client-side anti-spam quick exits
    const elapsed = Date.now() - this.startedAt;
    if (elapsed < 3000) return;
    if (this.form.value.hp?.trim()) return;

    this.sending = true;
    try {
      const res = await this.svc.send({
        name: this.form.value.name,
        email: this.form.value.email,
        message: this.form.value.message,
        turnstileToken: this.form.value.turnstileToken,
        elapsedMs: elapsed
      } as any);

      this.sent = !!res.ok;
      if (res.ok) this.form.reset();
    } finally {
      this.sending = false;
      this.startedAt = Date.now();
    }
  }
}
