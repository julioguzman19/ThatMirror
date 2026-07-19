import { Component, signal } from '@angular/core';
import { FeatureItemComponent } from './components/feature-item/feature-item.component';


@Component({
  selector: 'app-root',
  imports: [FeatureItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('that-mirror');

galleryAtStart = true;
galleryAtEnd = false;

scrollGalleryPage(element: HTMLElement, direction: number): void {
  const card = element.querySelector<HTMLElement>('article');

  if (!card) {
    return;
  }

  const gap = window.innerWidth >= 640 ? 16 : 12;
  const cardsToMove = window.innerWidth >= 640 ? 2 : 1;

  element.scrollBy({
    left: (card.offsetWidth + gap) * cardsToMove * direction,
    behavior: 'smooth',
  });
}

updateGalleryButtons(element: HTMLElement): void {
  const tolerance = 2;

  this.galleryAtStart = element.scrollLeft <= tolerance;

  this.galleryAtEnd =
    element.scrollLeft + element.clientWidth >= element.scrollWidth - tolerance;
}
}
