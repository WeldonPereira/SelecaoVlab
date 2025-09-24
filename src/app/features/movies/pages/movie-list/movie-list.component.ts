import { Component, OnInit, inject } from '@angular/core';
import { MovieFacade } from '../../services/movie.facade';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { CarouselItem } from '@shared/components/carousel/carousel.component';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MovieCardComponent,
    ReactiveFormsModule,
    CarouselComponent,
  ],
})
export class MovieListComponent implements OnInit {
  facade = inject(MovieFacade);
  searchControl = new FormControl('');

  popularMovies: CarouselItem[] = [];
  topRatedMovies: CarouselItem[] = [];
  upcomingMovies: CarouselItem[] = [];
  nowPlayingMovies: CarouselItem[] = [];

  ngOnInit() {
    this.loadMovieCategories();

    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query) {
          this.facade.searchMovies(query);
        } else {
          this.facade.loadPopularMovies();
        }
      });
  }

  private loadMovieCategories() {
    this.facade.loadPopularMovies();

    this.facade.movies$.subscribe((state) => {
      if (state.movies.length > 0) {
        const movies = state.movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          imgSrc: movie.poster_path,
          link: `/movie/${movie.id}`,
          rating: (movie.vote_average / 10) * 100,
          vote: movie.vote_average,
          releaseDate: movie.release_date,
          duration: 0,
        }));

        this.popularMovies = movies;

        movies.forEach((m) => {
          this.facade.loadMovieDetails(m.id).subscribe((details) => {
            m.duration = details.runtime;
          });
        });

        this.topRatedMovies = [...movies]
          .sort((a, b) => b.vote - a.vote)
          .slice(0, 20);

        this.upcomingMovies = [...movies]
          .filter((movie) => new Date(movie.releaseDate) <= new Date())
          .sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
          )
          .slice(0, 20);
      }
    });
  }
}
