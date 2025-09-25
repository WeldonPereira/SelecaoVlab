import { Component, OnInit, inject } from '@angular/core';
import { MovieFacade } from '../../services/movie.facade';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CarouselItem } from '@shared/components/carousel/carousel.component';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { MovieStateService } from '../../state/movie.state';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [CommonModule, AsyncPipe, MovieCardComponent, CarouselComponent],
})
export class MovieListComponent implements OnInit {
  state = inject(MovieStateService);
  private facade = inject(MovieFacade);

  searchQuery = '';

  popularMovies: CarouselItem[] = [];
  topRatedMovies: CarouselItem[] = [];
  upcomingMovies: CarouselItem[] = [];

  ngOnInit() {
    this.loadMovieCategories();

    this.state.movies$.subscribe((state) => {
      const hasSearchResults = state.movies.length > 0;

      if (hasSearchResults) {
        this.popularMovies = state.movies.map((movie) =>
          this.mapToCarouselItem(movie)
        );
        this.topRatedMovies = [];
        this.upcomingMovies = [];

        this.searchQuery = this.facade.lastSearchQuery || '';
      } else {
        this.popularMovies = state.popularMovies.map((movie) =>
          this.mapToCarouselItem(movie)
        );
        this.topRatedMovies = state.topRatedMovies.map((movie) =>
          this.mapToCarouselItem(movie)
        );
        this.upcomingMovies = state.upcomingMovies.map((movie) =>
          this.mapToCarouselItem(movie)
        );
        this.searchQuery = '';
      }
    });
  }

  private loadMovieCategories() {
    this.facade.loadPopularMovies();
    this.facade.loadTopRatedMovies();
    this.facade.loadUpcomingMovies();
  }

  private mapToCarouselItem(movie: any): CarouselItem {
    const item: CarouselItem = {
      id: movie.id,
      title: movie.title,
      imgSrc: movie.poster_path,
      link: `/movie/${movie.id}`,
      rating: (movie.vote_average / 10) * 100,
      vote: movie.vote_average,
      duration: 0,
      releaseDate: movie.release_date,
    };

    this.facade.loadMovieDetails(item.id).subscribe((details) => {
      item.duration = details.runtime;
    });

    return item;
  }
}
