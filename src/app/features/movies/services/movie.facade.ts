import { Injectable, inject } from '@angular/core';
import { MovieApiService } from '../api/movie.api';
import { MovieStateService } from '../state/movie.state';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieFacade {
  private api = inject(MovieApiService);
  private state = inject(MovieStateService);

  movies$ = this.state.movies$;

  loadPopularMovies(page = 1) {
    this.state.setLoading(true);
    this.api
      .getPopularMovies(page)
      .pipe(
        tap((response) => {
          this.state.setMovies(response.results);
          this.state.setPagination(response.page, response.total_pages);
          this.state.setLoading(false);
        }),
        catchError((err) => {
          this.state.setError('Failed to load popular movies.');
          this.state.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  searchMovies(query: string, page = 1) {
    this.state.setLoading(true);
    this.api
      .searchMovies(query, page)
      .pipe(
        tap((response) => {
          this.state.setMovies(response.results);
          this.state.setPagination(response.page, response.total_pages);
          this.state.setLoading(false);
        }),
        catchError((err) => {
          this.state.setError('Failed to search movies.');
          this.state.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  loadMovieDetails(movieId: number) {
    return this.api.getMovieDetails(movieId).pipe(
      map((details) => ({
        id: details.id,
        title: details.title,
        runtime: details.runtime,
        releaseDate: details.release_date,
        poster: details.poster_path,
      })),
      catchError((err) => {
        console.error(`Erro ao carregar detalhes do filme ${movieId}`, err);
        return of({
          id: movieId,
          title: 'Desconhecido',
          runtime: 0,
          releaseDate: '',
          poster: '',
        });
      })
    );
  }
}
