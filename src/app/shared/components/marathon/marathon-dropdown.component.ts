import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MarathonService } from '../../../features/movies/services/marathon.service';

@Component({
  selector: 'app-marathon-dropdown',
  templateUrl: './marathon-dropdown.component.html',
  styleUrls: ['./marathon-dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, AsyncPipe],
})
export class MarathonDropdownComponent {
  private marathonService = inject(MarathonService);
  private router = inject(Router);

  movies$ = this.marathonService.movies$;
  open = false;

  toggleDropdown() {
    this.open = !this.open;
  }

  removeMovie(movieId: number) {
    this.marathonService.removeMovie(movieId);
  }

  get totalDuration(): string {
    return this.marathonService.getTotalDuration();
  }

  goToMovieDetail(movieId: number) {
    this.router.navigate(['/movies', movieId]);
    this.open = false;
  }
}
