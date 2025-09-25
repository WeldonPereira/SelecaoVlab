import {
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Component,
  AfterViewInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarathonService } from '../../../features/movies/services/marathon.service';

export interface CarouselItem {
  id: number;
  title?: string;
  name?: string;
  imgSrc?: string;
  link: string;
  rating?: number;
  vote?: number;
  character?: string;
  releaseDate?: string;
  duration?: number;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CarouselComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() items: CarouselItem[] = [];
  @Input() isExplore = false;
  @Input() exploreLink = '';
  @Input() isDefaultCarousel = true;
  @Input() isCastCarousel = false;

  @Output() prevSlideEvent = new EventEmitter<void>();
  @Output() nextSlideEvent = new EventEmitter<void>();

  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef<HTMLDivElement>;

  canNavigateLeft = false;
  canNavigateRight = false;

  private marathonService = inject(MarathonService);

  ngAfterViewInit() {
    this.updateNavigation();
    this.carouselContainer.nativeElement.addEventListener('scroll', () => {
      this.updateNavigation();
    });
  }

  prevSlide() {
    this.carouselContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
    this.prevSlideEvent.emit();
  }

  nextSlide() {
    this.carouselContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
    this.nextSlideEvent.emit();
  }

  private updateNavigation() {
    const container = this.carouselContainer.nativeElement;
    this.canNavigateLeft = container.scrollLeft > 0;
    this.canNavigateRight =
      container.scrollLeft < container.scrollWidth - container.clientWidth;
  }

  getPosterUrl(imgSrc: string): string {
    return `https://image.tmdb.org/t/p/w500${imgSrc}`;
  }

  addToMarathon(item: CarouselItem) {
    this.marathonService.addMovie(item);
    console.log(`Filme "${item.title}" adicionado à Maratona!`);
  }
}
