import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { HomeComponent } from './pages/home/home.component';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    component: MovieListComponent,
    data: { renderMode: RenderMode.Prerender },
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    data: { renderMode: RenderMode.Server },
  },
  {
    path: 'search/:query',
    component: SearchResultsComponent,
    data: { renderMode: RenderMode.Server },
  },
  {
    path: 'tv/:id',
    component: SeriesDetailsComponent,
    data: { renderMode: RenderMode.Server },
  },
  {
    path: 'tv',
    component: SeriesListComponent,
    data: { renderMode: RenderMode.Prerender },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { renderMode: RenderMode.Prerender },
  },
];
