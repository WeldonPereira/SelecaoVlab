import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../types/movie.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private http = inject(HttpClient);
  private readonly apiKey = environment.apiKey;
  private readonly apiUrl = environment.apiUrl;

  getPopularMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    );
  }

  searchMovies(query: string, page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`
    );
  }
}
