import { Component, OnInit } from '@angular/core';
import { MovieCredit, MovieDetails } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetails | null = null;
  trailerUrl: string | null = null;
  cast: MovieCredit[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  genres: string = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (!idParam) return;

      const id = Number(idParam);
      if (id <= 0) return;

      this.movieService.getMovieDetails(id).subscribe({
        next: (res) => {
          this.movie = res;
          this.genres = res.genres.map((g) => g.name).join(', ');
        },
        error: (err) => console.error('Erro ao carregar detalhes:', err),
      });
      this.movieService.getCredits(id).subscribe((res) => {
        this.cast = res.cast.slice(0, 6);
      });

      this.movieService.getMoviesVideos(id).subscribe({
        next: (res) => {
          const trailer = res.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          this.trailerUrl = trailer
            ? `https://www.youtube.com/embed/${trailer.key}`
            : null;
        },
        error: (err) => console.error('Erro ao carregar trailer', err),
      });
    });
  }
}
