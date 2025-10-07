import { Component, OnInit } from '@angular/core';
import { SerieCredit, Series } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-series-details',
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss',
})
export class SeriesDetailsComponent implements OnInit {
  serie: Series | null = null;
  cast: SerieCredit[] = [];
  trailerUrl: string | null = null

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (!idParam) return;

      const id = Number(idParam);
      if (id <= 0) return;

      this.movieService.getSeriesDetails(id).subscribe({
        next: (res) => {
          this.serie = res;
        },
        error: (err) => console.error('Erro ao carregar série', err),
      });
      this.movieService.getSeriesCredits(id).subscribe((res) => {
        this.cast = res.cast.slice(0, 6);
      });
      this.movieService.getSeriesVideos(id).subscribe({
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
