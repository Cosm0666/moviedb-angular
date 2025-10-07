import { Component, OnInit } from '@angular/core';
import {
  MovieResponse,
  MovieSearchItem,
  SeriesSearchItem,
} from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  query = '';
  movies: MovieSearchItem[] = [];
  series: SeriesSearchItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.query = params['query'];
      this.searchMovies();
      this.searchShows();
    });
  }
  searchShows() {
    this.movieService.searchShows(this.query).subscribe({
      next: (res) => {
        this.series = res.results.filter(
          (serie) =>
            serie.poster_path !== null &&
            serie.name.toLowerCase() !== this.query.toLowerCase()
        );
      },
      error: (err) => console.error('Error na buscar', err),
    });
  }
  goToSerie(id: number) {
    this.router.navigate(['/tv', id]);
  }

  searchMovies() {
    this.movieService.searchMovies(this.query).subscribe({
      next: (res) => {
        this.movies = res.results.filter(
          (movie) =>
            movie.poster_path !== null &&
            movie.title.toLowerCase() !== this.query.toLowerCase()
        );
      },
      error: (err) => console.error('Error na buscar', err),
    });
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
