import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  movieId!: number;
  movieData: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.fetchMovieDetails();
    });
  }

  genresString: string = '';

  fetchMovieDetails() {
    const API_KEY = environment.apiKey;
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${API_KEY}&language=pt-BR`
      )
      .subscribe((data) => {
        this.movieData = data;
        this.genresString =
          this.movieData.genres?.map((g: any) => g.name).join(', ') || '';
      });
  }

  getPosterUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
