import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Series } from '../../models/movie.model';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-series-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.scss',
})
export class SeriesListComponent implements OnInit {
  series: Series[] = [];
  currentPage = 1;
  loading = false;
  observer!: IntersectionObserver;
  @Input() enableInfiniteScroll = true;
  

  @ViewChild('anchor', { static: true }) anchor!: ElementRef;

  constructor(private movieService: MovieService, public router: Router) {}

  ngOnInit(): void {
    this.loadSeries();
    this.setupIntersectionObserver();
  }

  loadSeries(): void {
    if (this.loading) return;
    this.loading = true;

    this.movieService.getPopularSeries(this.currentPage).subscribe({
      next: (res) => {
        this.series = [...this.series, ...res.results];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar series', err);
        this.loading = false;
      },
    });
  }

  goToSerie(id: number) {
    this.router.navigate(['/tv', id]);
  }

  private setupIntersectionObserver(): void {
    if(!this.enableInfiniteScroll) return
    this.observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !this.loading) {
        this.currentPage++;
        this.loadSeries();
      }
    });
    this.observer.observe(this.anchor.nativeElement);
  }
}
