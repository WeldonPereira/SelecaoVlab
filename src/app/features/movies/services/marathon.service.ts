import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarouselItem } from '@shared/components/carousel/carousel.component';

const STORAGE_KEY = 'marathonMovies';

@Injectable({
  providedIn: 'root',
})
export class MarathonService {
  private moviesSubject = new BehaviorSubject<CarouselItem[]>(
    this.loadFromStorage()
  );
  movies$ = this.moviesSubject.asObservable();

  addMovie(movie: CarouselItem) {
    const current = this.moviesSubject.value;
    if (!current.find((m) => m.id === movie.id)) {
      const updated = [...current, movie];
      this.moviesSubject.next(updated);
      this.saveToStorage(updated);
    }
  }

  removeMovie(movieId: number) {
    const updated = this.moviesSubject.value.filter((m) => m.id !== movieId);
    this.moviesSubject.next(updated);
    this.saveToStorage(updated);
  }

  getTotalDuration(): string {
    const totalMinutes = this.moviesSubject.value.reduce(
      (sum, m) => sum + (m.duration || 0),
      0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  private saveToStorage(movies: CarouselItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }

  private loadFromStorage(): CarouselItem[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}
