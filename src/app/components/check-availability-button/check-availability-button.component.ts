import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-check-availability-button',
  templateUrl: './check-availability-button.component.html',
  host: {
    class: 'block w-full sm:w-auto',
  },
})
export class CheckAvailabilityButtonComponent {
  readonly label = input.required<string>();
  readonly pressed = output<void>();
}