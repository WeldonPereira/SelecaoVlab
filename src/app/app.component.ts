import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieFacade } from './features/movies/services/movie.facade';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MarathonDropdownComponent } from '@shared/components/marathon/marathon-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, MarathonDropdownComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Filmes';
  searchControl = new FormControl('');

  constructor(private facade: MovieFacade) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        if (query) {
          this.facade.searchMovies(query);
        } else {
          this.facade.loadPopularMovies();
        }
      });
  }
}
