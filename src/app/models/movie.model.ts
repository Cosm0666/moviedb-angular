export interface MovieListItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  budget: number;
  revenue: number;
  homepage?: string;
  videos?: {
    results: {
      key: string;
      name: string;
    }[];
  };
}

export interface MovieSearchResponse {
  page: number;
  results: MovieSearchItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieSearchItem {
  title: string;
  id: number;
  release_date?: number;
  poster_path?: string;
}

export interface MovieCredit {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path?: string | null;
  department: string;
}

export interface MovieCreditsResponse {
  id: number;
  cast: MovieCredit[];
  crew: MovieCredit[];
}

export interface Series {
  id: number;
  name: string;
  poster_path: string;
  vote_everage: number;
  overview: string;
  backdrop_path: string | null;
  release_date: number;
  first_air_date: string;
  number_of_seasons: string;
  number_of_episodes: string;
}
export interface SeriesResponse {
  page: number;
  results: Series[];
  total_pages: number;
}

export interface SeriesSearchResponse {
  page: number;
  results: SeriesSearchItem[];
  total_pages: number;
  total_results: number;
}

export interface SeriesSearchItem {
  title?: string;
  name?: string;
  id: number;
  first_air_date?: string;
  poster_path?: string;
}

export interface SerieCreditsResponse {
  id: number;
  cast: SerieCredit[];
  crew: SerieCredit[];
}

export interface SerieCredit {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path?: string | null;
  department: string;
}
