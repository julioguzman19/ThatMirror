import { Component, signal } from '@angular/core';
import { CheckAvailabilityButtonComponent } from './components/check-availability-button/check-availability-button.component';
import { FeatureItemComponent } from './components/feature-item/feature-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';

type FeatureIcon =
  | 'camera'
  | 'sparkles'
  | 'flower'
  | 'guests'
  | 'celebration'
  | 'delivery';

interface Feature {
  icon: FeatureIcon;
  title: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CheckAvailabilityButtonComponent,
    FeatureItemComponent,
    GalleryComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('that-mirror');

  protected readonly features: Feature[] = [
    {
      icon: 'camera',
      title: 'Photo Moments',
    },
    {
      icon: 'sparkles',
      title: 'Customizable',
    },
    {
      icon: 'flower',
      title: 'Easy Styling',
    },
    {
      icon: 'guests',
      title: 'Guest Favorite',
    },
    {
      icon: 'celebration',
      title: 'Any Event',
    },
    {
      icon: 'delivery',
      title: 'Setup Included',
    },
  ];
}