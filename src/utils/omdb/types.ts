export type Type = 'movie' | 'series' | 'episode';
export type Rated = 'PG' | 'TV-MA' | string;
export type Genre = 'Animation' | 'Adventure' | 'Comedy' | 'Family' | 'Fantasy' | string;
type NotAvailable = 'N/A';
type Boolean = 'True' | 'False';

interface Rating {
  Source: string;
  Value: string;
}

export interface FetchResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string | NotAvailable;
  Country: string;
  Director: string;
  DVD: string | NotAvailable;
  Genre: Genre[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Language: string;
  Metascore: string | NotAvailable;
  Plot: string | NotAvailable;
  Poster: string | NotAvailable;
  Production: string | NotAvailable;
  Rated: Rated;
  Ratings: Rating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: Type;
  Website: string | NotAvailable;
  Writers: string[];
  Year: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string | NotAvailable;
}

export interface SearchResponse {
  Search: MovieDetails[];
  totalResults: string;
  Response: Boolean;
}

type ResponseStatus = Boolean;

export interface ErrorResponse {
  Error: string;
  Response: ResponseStatus;
}
