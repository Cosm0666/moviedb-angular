import { Component } from '@angular/core';
import { MovieListComponent } from "../../movie-list/movie-list.component";
import { SeriesListComponent } from "../../components/series-list/series-list.component";

@Component({
  selector: 'app-home',
  imports: [MovieListComponent, SeriesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
