import { fetchMovies } from 'utils/omdb/api';
import { MovieDetails } from 'utils/omdb/types';

interface GetMoviesMessageBody {
  search: string;
  category: string;
};

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
  // fetch first batch of movies
  let currentPage = 1;
  const moviesResult = await fetchMovies(message.data.search, message.data.category, currentPage);
  if (moviesResult) {
    postMessage({
      movies: moviesResult.Search,
      status: MESSAGE_STATUS.RUNNING
    });
    const fetches = [];

    // check how many pages are available for current search
    const pages = Math.ceil((Number(moviesResult.totalResults) / RESULTS_PER_PAGE));
    let morePagesAvailable = pages > 1;

    // fetch available pages for more movies, limited to not exhaust API limit
    while (morePagesAvailable && currentPage < MAX_PAGES) {
      currentPage++;
      fetches.push(fetchMovies(message.data.search, message.data.category, currentPage));
      morePagesAvailable = currentPage < pages;
    }
    const results = await Promise.all(fetches);
    results.forEach(result => {
      if (result?.Search) {
        // return each batch from worker
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
