import { Component } from '@angular/core';

interface GalleryItem {
  image: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  protected galleryAtStart = true;
  protected galleryAtEnd = false;

  protected readonly galleryItems: GalleryItem[] = [
    {
      image: 'images/welcome-sign.png',
      alt: 'Mirror used as a wedding welcome sign',
      title: 'Welcome sign',
    },
    {
      image: 'images/seating-chart.png',
      alt: 'Mirror used as a seating chart',
      title: 'Seating chart',
    },
    {
      image: 'images/brunch.png',
      alt: 'Mirror styled for an outdoor brunch',
      title: 'Brunch',
    },
    {
      image: 'images/event-backdrop.png',
      alt: 'Mirror used as an event backdrop',
      title: 'Event backdrop',
    },
  ];

  protected scrollGalleryPage(track: HTMLElement, direction: -1 | 1): void {
    const scrollAmount = track.clientWidth;

    track.scrollBy({
      left: scrollAmount * direction,
      behavior: 'smooth',
    });
  }

  protected updateGalleryButtons(track: HTMLElement): void {
    const maximumScroll = track.scrollWidth - track.clientWidth;

    this.galleryAtStart = track.scrollLeft <= 4;
    this.galleryAtEnd = track.scrollLeft >= maximumScroll - 4;
  }
}