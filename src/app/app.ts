import { Component, signal } from '@angular/core';
import { FeatureItemComponent } from './components/feature-item.component';


@Component({
  selector: 'app-root',
  imports: [FeatureItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('that-mirror');
}
