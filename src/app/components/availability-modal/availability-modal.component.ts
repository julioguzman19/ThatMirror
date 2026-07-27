import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface AvailabilityRequest {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  location: string;
  eventType: string;
  details: string;
}

@Component({
  selector: 'app-availability-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './availability-modal.component.html',
})
export class AvailabilityModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly document = inject(DOCUMENT);

  readonly isOpen = input(false);
  readonly priceText = input('Starting at $___');

  readonly closed = output<void>();
  readonly requestSubmitted = output<AvailabilityRequest>();

  protected readonly minimumDate = this.getCurrentDate();

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    eventDate: ['', Validators.required],
    location: ['', Validators.required],
    eventType: ['', Validators.required],
    details: [''],

    // Hidden spam-protection field. Real visitors should never fill this out.
    website: [''],
  });

  constructor() {
    effect((onCleanup) => {
      if (!this.isOpen()) {
        return;
      }

      const previousOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = 'hidden';

      onCleanup(() => {
        this.document.body.style.overflow = previousOverflow;
      });
    });
  }

  @HostListener('document:keydown.escape')
  protected handleEscapeKey(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  protected close(): void {
    this.closed.emit();
  }

  protected handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  protected submit(): void {
    // Bots commonly fill hidden fields.
    if (this.form.controls.website.value) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { website: _website, ...request } = this.form.getRawValue();

    this.requestSubmitted.emit(request);
  }

  protected isInvalid(
    field:
      | 'name'
      | 'email'
      | 'phone'
      | 'eventDate'
      | 'location'
      | 'eventType',
  ): boolean {
    const control = this.form.controls[field];

    return control.invalid && control.touched;
  }

  private getCurrentDate(): string {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60_000;
    const localDate = new Date(today.getTime() - timezoneOffset);

    return localDate.toISOString().split('T')[0];
  }
}