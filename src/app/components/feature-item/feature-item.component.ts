import { Component, input } from '@angular/core';

export type FeatureIcon =
  | 'camera'
  | 'sparkles'
  | 'flower'
  | 'guests'
  | 'celebration'
  | 'delivery';

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
})
export class FeatureItemComponent {
  title = input.required<string>();
  icon = input.required<FeatureIcon>();
}