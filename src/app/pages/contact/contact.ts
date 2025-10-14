import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { AnimatedSectionComponent } from "../../shared/animated-section/animated-section";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedSectionComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  form!: FormGroup;
  sending = false;
  sent = false;

  constructor(private fb: FormBuilder, private svc: ContactService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async submit() {
    if (this.form.invalid) return;
    this.sending = true;

    const res = await this.svc.send(this.form.value as any);

    this.sending = false;
    this.sent = res.ok;

    if (res.ok) this.form.reset();
  }
}
