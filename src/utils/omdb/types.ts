export type Type = 'movie' | 'series' | 'episode';
export type Rated = 'PG' | 'TV-MA' | string;
export type Genre = 'Animation' | 'Adventure' | 'Comedy' | 'Family' | 'Fantasy' | string;

interface Rating {
  Source: string;
  Value: string;
}

export interface FetchResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string | "N/A";
  Country: string;
  Director: string;
  DVD: string | "N/A";
  Genre: Genre[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Language: string;
  Metascore: string | "N/A";
  Plot: string | "N/A";
  Poster: string | "N/A";
  Production: string | "N/A";
  Rated: Rated;
  Ratings: Rating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: Type;
  Website: string | "N/A";
  Writers: string[];
  Year: number;
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string | 'N/A';
}

export interface SearchResponse {
  Search: Search[];
  totalResults: string;
  Response: 'True' | 'False';
}

type ResponseStatus = 'True' | 'False';

export interface Response {
  Error?: string;
  Response: ResponseStatus;
  Search: any[];
  totalResults: string;
}

export interface ErrorResponse {
  Error: string;
  Response: ResponseStatus;
}
