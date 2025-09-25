import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MovieListComponent } from './movie-list.component';
import { MovieFacade } from '../../services/movie.facade';
import { MovieStateService } from '../../state/movie.state';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieFacadeMock: any;
  let movieStateMock: any;

  beforeEach(async () => {
    movieFacadeMock = {
      loadPopularMovies: jasmine.createSpy('loadPopularMovies'),
      loadTopRatedMovies: jasmine.createSpy('loadTopRatedMovies'),
      loadUpcomingMovies: jasmine.createSpy('loadUpcomingMovies'),
      loadMovieDetails: jasmine
        .createSpy('loadMovieDetails')
        .and.returnValue(of({ runtime: 120 })),
      lastSearchQuery: '',
    };

    movieStateMock = {
      movies$: of({
        movies: [],
        popularMovies: [
          {
            id: 1,
            title: 'Test',
            poster_path: '/x',
            vote_average: 8,
            release_date: '2025-01-01',
          },
        ],
        topRatedMovies: [],
        upcomingMovies: [],
      }),
    };

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        { provide: MovieFacade, useValue: movieFacadeMock },
        { provide: MovieStateService, useValue: movieStateMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar loadPopularMovies, loadTopRatedMovies e loadUpcomingMovies no ngOnInit', () => {
    component.ngOnInit();
    expect(movieFacadeMock.loadPopularMovies).toHaveBeenCalled();
    expect(movieFacadeMock.loadTopRatedMovies).toHaveBeenCalled();
    expect(movieFacadeMock.loadUpcomingMovies).toHaveBeenCalled();
  });

  it('deve mapear corretamente um filme para CarouselItem', () => {
    const movie = {
      id: 1,
      title: 'Teste',
      poster_path: '/x',
      vote_average: 8,
      release_date: '2025-01-01',
    };
    const item = (component as any).mapToCarouselItem(movie);

    expect(item.id).toBe(1);
    expect(item.title).toBe('Teste');
    expect(item.link).toBe('/movie/1');
    expect(item.rating).toBe(80);
    expect(movieFacadeMock.loadMovieDetails).toHaveBeenCalledWith(1);
  });
});
