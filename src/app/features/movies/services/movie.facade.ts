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

  lastSearchQuery = '';

  loadPopularMovies(page = 1) {
    this.state.setLoading(true);
    this.api
      .getPopularMovies(page)
      .pipe(
        tap((response) => {
          this.state.setPopularMovies(response.results);
          this.state.setPagination(response.page, response.total_pages);
          this.state.setLoading(false);
        }),
        catchError((err) => {
          this.state.setError('Falha ao carregar filmes populares.');
          this.state.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  loadTopRatedMovies(page = 1) {
    this.state.setLoading(true);
    this.api
      .getTopRatedMovies(page)
      .pipe(
        tap((response) => {
          this.state.setTopRatedMovies(response.results);
          this.state.setPagination(response.page, response.total_pages);
          this.state.setLoading(false);
        }),
        catchError((err) => {
          this.state.setError('Falha ao carregar filmes mais bem avaliados.');
          this.state.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  loadUpcomingMovies(page = 1) {
    this.state.setLoading(true);
    this.api
      .getUpcomingMovies(page)
      .pipe(
        tap((response) => {
          this.state.setUpcomingMovies(response.results);
          this.state.setPagination(response.page, response.total_pages);
          this.state.setLoading(false);
        }),
        catchError((err) => {
          this.state.setError('Falha ao carregar filmes próximos.');
          this.state.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  searchMovies(query: string, page = 1) {
    this.lastSearchQuery = query; // <-- armazenando a query
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
          this.state.setError('Falha na busca de filmes.');
          this.state.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  clearSearch() {
    this.lastSearchQuery = '';
    this.state.setMovies([]);
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
