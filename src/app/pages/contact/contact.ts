import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { LINKS } from '../../config/links';
import { environment } from '../../../environments/environment';

declare global {
  interface Window { turnstile: any; }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  sending = false;
  sent = false;
  error= false;
  startedAt = 0; // time-trap
  links = LINKS;
  env = environment;

  private widgetId: string | null = null;
  private tsInterval: ReturnType<typeof setInterval> | null = null;


  constructor(private fb: FormBuilder, private svc: ContactService) {}

  ngOnInit() {
    this.startedAt = Date.now();
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      hp: [''],
      turnstileToken: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // Wait until the Turnstile script is ready
    this.tsInterval = setInterval(() => {
      if (window.turnstile?.render) {
        clearInterval(this.tsInterval!);

        const ts = document.getElementById('turnstile-widget');
        if (ts) {
          this.widgetId = window.turnstile.render(ts, {
            sitekey: this.env.turnstileSiteKey,
            callback: (token: string) => {
              this.form.get('turnstileToken')?.setValue(token);
            }
          });
        } else {
          console.warn('Turnstile container not found in DOM');
        }
      }
    }, 200);
  }

  ngOnDestroy() {
    if (this.tsInterval) {
      clearInterval(this.tsInterval);
    }
    window.turnstile?.remove?.(this.widgetId);
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
      });

      this.sent = !!res.ok;
      this.error = !res.ok;
      if (res.ok) {
        this.form.reset();
        if (this.widgetId) window.turnstile.reset(this.widgetId);
      }
    } finally {
      this.sending = false;
      this.startedAt = Date.now();
    }
  }
}
