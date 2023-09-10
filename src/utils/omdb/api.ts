import { fetchData } from 'utils/fetch';
import type { SearchResponse, FetchResponse, ErrorResponse } from './types';

function getOMDBMoviesUrl(title: string, type: string, page: number) {
  return `${process.env.REACT_APP_OMDB_API}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&type=${type}&s=${title}&page=${page}`;
}

function getOMDBMovieUrl(IMDBId: string) {
  return `${process.env.REACT_APP_OMDB_API}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${IMDBId}`;
}

function isResponseOk<T extends SearchResponse | FetchResponse>(OMDBReponse: T | ErrorResponse): OMDBReponse is T {
  return 'Response' in OMDBReponse && OMDBReponse?.Response === 'True';
}

export async function fetchMovies(title: string, page: number = 0): Promise<SearchResponse | null> {
  const type = 'movie';
  const response = await fetchData<SearchResponse | ErrorResponse>(getOMDBMoviesUrl(title, type, page));
  if (response && isResponseOk(response)) {
    return response;
  }
  return null;
}

export async function fetchMovie(title: string): Promise<FetchResponse | null> {
  const response = await fetchData<FetchResponse | ErrorResponse>(getOMDBMovieUrl(title));
  if (response && isResponseOk(response)) {
    return response;
  }
  return null;
}
