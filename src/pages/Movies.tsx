import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoviesList } from './../components/MoviesList/MoviesList';
import { MoviesHeader } from './../components/MoviesHeader/MoviesHeader';
import { Loader } from 'components/Loader/Loader';
import type { GetMoviesResponse } from 'workers/getMovies';
import type { MovieDetails } from 'utils/omdb/types';

export function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  const movieGetter: Worker = useMemo(
    () => new Worker(new URL('./../workers/getMovies.ts', import.meta.url)),
    []
  );

  const getMovies = async (query: string) => {
    setMovies([]);
    setLoading(true);
    if (window.Worker) {
      movieGetter.postMessage(query);
    }
  }

  useEffect(() => {
    if (search) {
      getMovies(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchParams.set('search', search);
    if (!search) {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies])

  useEffect(() => {
    const searchParamsSearch = searchParams.get('search') ?? '';
    if (search !== searchParamsSearch) {
      setSearch(searchParamsSearch);
      getMovies(searchParamsSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    if (window.Worker) {
      movieGetter.onmessage = (event: MessageEvent<GetMoviesResponse>) => {
        setMovies((oldArray: MovieDetails[]) => [...oldArray, ...event.data.movies]);
        if (event.data.status === 'done') {
          setLoading(false);
        }
      };
    }
  }, [movieGetter]);

  return (
    <>
      <MoviesHeader setSearch={setSearch} getMovies={() => getMovies(search)} search={search} />
      <div>
        {loading ? (
          <Loader>
            Please wait
          </Loader>
        ) : movies.length === 0 ? (
          <p>
            Use the search bar above to find any movie you like.
          </p>
        ) : (
          <MoviesList movies={movies} />
        )}
      </div>
    </>
  );
}
