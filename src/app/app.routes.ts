import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search/:query', component: SearchResultsComponent },
  { path: 'tv/:id', component: SeriesDetailsComponent },
  { path: 'tv', component: SeriesListComponent },
  { path: 'home', component: HomeComponent },
];
