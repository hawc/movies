import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoviesList } from './../components/MoviesList/MoviesList';
import { MoviesHeader } from './../components/MoviesHeader/MoviesHeader';
import { Loader } from 'components/Loader/Loader';
import { GetMoviesResponse } from 'workers/getMovies';
import type { Search as Movie } from 'utils/omdb/types';

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const movieGetter: Worker = useMemo(
    () => new Worker(new URL('./../workers/getMovies.ts', import.meta.url)),
    []
  );

  useEffect(() => {
    if (search) {
      getMovies(search);
    }
  }, []);

  const getMovies = async (query: string) => {
    setMovies([]);
    setLoading(true);
    if (window.Worker) {
      movieGetter.postMessage(query);
    }
  }

  useEffect(() => {
    searchParams.set('search', search);
    if (!search) {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  }, [movies])

  useEffect(() => {
    const searchParamsSearch = searchParams.get('search') ?? '';
    if (search !== searchParamsSearch) {
      setSearch(searchParamsSearch);
      getMovies(searchParamsSearch);
    }
  }, [searchParams])

  useEffect(() => {
    if (window.Worker) {
      movieGetter.onmessage = (event: MessageEvent<GetMoviesResponse>) => {
        setMovies((oldArray: Movie[]) => [...oldArray, ...event.data.movies]);
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

export default Movies;
