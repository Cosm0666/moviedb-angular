import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MovieListItem } from '../models/movie.model';
import { MovieService } from '../service/movie.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { error } from 'console';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  movies: MovieListItem[] = [];
  currentPage = 1;
  loading = false;
  observer!: IntersectionObserver;
  @ViewChild('anchor', { static: true }) anchor!: ElementRef;
  @Input() enableInfiniteScroll = true;
  

  constructor(private movieService: MovieService, public router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
    this.setupIntersectionObserver();
  }

  loadMovies() {
    this.loading = true;
    this.movieService.getPopularMovies(this.currentPage).subscribe({
      next: (data) => {
        this.movies = [...this.movies, ...data.results];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar movies', err);
        this.loading = false;
      },
    });
  }

  private setupIntersectionObserver(): void {
    if(!this.enableInfiniteScroll) return
    this.observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !this.loading) {
        this.currentPage++;
        this.loadMovies();
      }
    });
    this.observer.observe(this.anchor.nativeElement);
  }
}
