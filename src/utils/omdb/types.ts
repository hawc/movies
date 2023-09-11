export type Type = 'movie' | 'series' | 'episode';
export type Rated = 'PG' | 'TV-MA' | string;
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
  Genre: string;
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
  Response: Boolean;
  Released: string;
  Runtime: string;
  Title: string;
  Type: Type;
  Website: string | NotAvailable;
  Writer: string;
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
