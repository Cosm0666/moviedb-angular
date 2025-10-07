import { Component } from '@angular/core';
import {
  MovieDetails,
  MovieSearchItem,
  MovieSearchResponse,
  SeriesSearchItem,
} from '../../models/movie.model';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  movies: MovieSearchItem[] = [];
  series: SeriesSearchItem[] = [];
  query = '';

  constructor(private router: Router, private movieService: MovieService) {}

  onSearch() {
    if (!this.query.trim()) return;

    this.router.navigate(['/search', this.query]);
    this.query = '';
  }
}
