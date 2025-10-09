import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import {
  MovieCreditsResponse,
  MovieDetails,
  MovieResponse,
  MovieSearchResponse,
  SerieCreditsResponse,
  Series,
  SeriesResponse,
} from '../models/movie.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  
  private isServer(): boolean {
    return isPlatformServer(this.platformId);
  }


  private handleServerRequest<T>(): Observable<T> {
    if (this.isServer()) {
      console.log('Servidor: Evitando requisição HTTP');
      return of({} as T);
    }
    return null as any;
  }

  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    const serverResponse = this.handleServerRequest<MovieResponse>();
    if (serverResponse) return serverResponse;

    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
        page: page.toString(),
        include_adult: 'false',
      },
    });
  }

  searchMovies(query: string): Observable<MovieSearchResponse> {
    const serverResponse = this.handleServerRequest<MovieSearchResponse>();
    if (serverResponse) return serverResponse;

    return this.http.get<MovieSearchResponse>(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
        query,
      },
    });
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    const serverResponse = this.handleServerRequest<MovieDetails>();
    if (serverResponse) return serverResponse;

    return this.http.get<MovieDetails>(`${this.apiUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
        append_to_response: 'videos',
      },
    });
  }

  getMoviesVideos(id: number): Observable<{ results: any[] }> {
    const serverResponse = this.handleServerRequest<{ results: any[] }>();
    if (serverResponse) return serverResponse;

    return this.http.get<{ results: any }>(
      `${this.apiUrl}/movie/${id}/videos`,
      {
        params: {
          api_key: this.apiKey,
          language: 'pt-BR',
        },
      }
    );
  }

  getCredits(id: number): Observable<MovieCreditsResponse> {
    const serverResponse = this.handleServerRequest<MovieCreditsResponse>();
    if (serverResponse) return serverResponse;

    return this.http.get<MovieCreditsResponse>(
      `${this.apiUrl}/movie/${id}/credits`,
      {
        params: {
          api_key: this.apiKey,
          language: 'pt-BR',
        },
      }
    );
  }

  getSeriesCredits(series_id: number): Observable<SerieCreditsResponse> {
    const serverResponse = this.handleServerRequest<SerieCreditsResponse>();
    if (serverResponse) return serverResponse;

    return this.http.get<SerieCreditsResponse>(
      `${this.apiUrl}/tv/${series_id}/credits`,
      {
        params: {
          api_key: this.apiKey,
          language: 'pt-BR',
        },
      }
    );
  }

  searchShows(query: string): Observable<SeriesResponse> {
    const serverResponse = this.handleServerRequest<SeriesResponse>();
    if (serverResponse) return serverResponse;

    return this.http.get<SeriesResponse>(`${this.apiUrl}/search/tv`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
        query,
      },
    });
  }

  getSeriesDetails(series_id: number): Observable<Series> {
    const serverResponse = this.handleServerRequest<Series>();
    if (serverResponse) return serverResponse;

    return this.http.get<Series>(`${this.apiUrl}/tv/${series_id}`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
      },
    });
  }

  getSeriesVideos(series_id: number): Observable<{ results: any[] }> {
    const serverResponse = this.handleServerRequest<{ results: any[] }>();
    if (serverResponse) return serverResponse;

    return this.http.get<{ results: any }>(
      `${this.apiUrl}/tv/${series_id}/videos`,
      {
        params: {
          api_key: this.apiKey,
          language: 'pt-BR',
        },
      }
    );
  }

  getPopularSeries(page: number = 1): Observable<SeriesResponse> {
    const serverResponse = this.handleServerRequest<SeriesResponse>();
    if (serverResponse) return serverResponse;

    return this.http.get<SeriesResponse>(`${this.apiUrl}/tv/popular`,
      {
        params: {
          api_key: this.apiKey,
          language: 'pt-BR',
          page: page.toString(),
          include_adult: 'false',
        }
      }
    );
  }
}