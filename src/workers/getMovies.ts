import { fetchMovies } from 'utils/omdb/api';
import { MovieDetails } from 'utils/omdb/types';

type GetMoviesMessageBody = string;

export interface GetMoviesResponse {
  movies: MovieDetails[];
  status: string;
}

export enum MESSAGE_STATUS {
  RUNNING = 'running',
  DONE = 'done',
}

const RESULTS_PER_PAGE = 10;
const MAX_PAGES = 100;

// eslint-disable-next-line no-restricted-globals
self.onmessage = async (message: MessageEvent<GetMoviesMessageBody>) => {
  const fetches = [];
  const moviesResult = await fetchMovies(message.data, 1);
  if (moviesResult) {
    postMessage({
      movies: moviesResult.Search,
      status: MESSAGE_STATUS.RUNNING
    });
    const pages = Math.ceil((Number(moviesResult.totalResults) / RESULTS_PER_PAGE));
    let morePagesAvailable = pages > 1;
    let currentPage = 1;
    while (morePagesAvailable && currentPage < MAX_PAGES) {
      currentPage++;
      fetches.push(fetchMovies(message.data, currentPage));
      morePagesAvailable = currentPage < pages;
    }
    const results = await Promise.all(fetches);
    results.forEach(result => {
      if (result?.Search) {
        postMessage({
          movies: result?.Search,
          status: MESSAGE_STATUS.RUNNING
        });
      }
    })
  }
  postMessage({
    movies: [],
    status: MESSAGE_STATUS.DONE
  });
}
