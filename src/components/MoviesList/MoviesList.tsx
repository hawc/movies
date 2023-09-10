import './MoviesList.css';
import { useEffect, useMemo, useState } from 'react';
import { MovieItem } from './Item/Item';
import { Loader } from 'components/Loader/Loader';
import type { MovieDetails } from 'utils/omdb/types';

type GroupedMovies = null | { [key: string]: MovieDetails[] };

export function MoviesList({ movies }: { movies: MovieDetails[] }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedMovies, setGroupedMovies] = useState<GroupedMovies>(null);
  const [movieCategories, setMovieCategories] = useState<string[]>([]);

  const movierSorter: Worker = useMemo(
    () => new Worker(new URL('../../workers/groupMovies.ts', import.meta.url)),
    []
  );

  useEffect(() => {
    if (groupedMovies) {
      const movieCategories = Object.keys(groupedMovies).sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }));
      setMovieCategories(movieCategories);
    }
  }, [groupedMovies]);

  useEffect(() => {
    if (window.Worker) {
      movierSorter.postMessage({
        data: movies,
        type: 'Year'
      });
    }
  }, [movies, movierSorter]);

  useEffect(() => {
    if (window.Worker) {
      movierSorter.onmessage = (e: MessageEvent<GroupedMovies>) => {
        setLoading(false);
        setGroupedMovies(e.data);
      };
    }
  }, [movierSorter]);

  if (!groupedMovies || loading) {
    return (
      <Loader>
        Nearly done
      </Loader>
    );
  }

  return (
    <>
      <h2>Search results by year</h2>
      {movieCategories.map((moviesYear: string) => (
        <div key={`${moviesYear}${groupedMovies[moviesYear].length}`}>
          <h3>{moviesYear}</h3>
          <div className='movies-list-frame'>
            <div className='movies-list-wrapper'>
              <ul className='movies-list'>
                {groupedMovies[moviesYear].map((movie: MovieDetails) => (
                  <MovieItem key={movie.imdbID} movie={movie} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
