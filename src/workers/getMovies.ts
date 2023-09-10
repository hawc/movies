import { fetchMovies } from 'utils/omdb/api';
import { Search } from 'utils/omdb/types';

type GetMoviesMessageBody = string;

export interface GetMoviesResponse {
  movies: Search[];
  status: string;
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
      status: 'running'
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
          status: 'running'
        });
      }
    })
  }
  postMessage({
    movies: [],
    status: 'done'
  });
}
