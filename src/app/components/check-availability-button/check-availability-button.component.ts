import { Component, input } from '@angular/core';

@Component({
  selector: 'app-check-availability-button',
  templateUrl: './check-availability-button.component.html',
  host: {
    class: 'block w-full sm:w-auto',
  },
})
export class CheckAvailabilityButtonComponent {
  label = input.required<string>();
}