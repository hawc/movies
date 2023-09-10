import { useEffect, useMemo, useState } from 'react';
import { MovieItem } from './Item/Item';
import './MoviesList.css';
import type { Search as Movie } from 'utils/omdb/types';
import { Loader } from 'components/Loader/Loader';

type GroupedMovies = null | { [key: string]: Movie[] };

export function MoviesList({ movies }: { movies: Movie[] }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedMovies, setGroupedMovies] = useState<GroupedMovies | null>(null);
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
      {movieCategories.map((moviesYear: string) => (
        <div key={`${moviesYear}${groupedMovies[moviesYear].length}`}>
          <h2>{moviesYear}</h2>
          <div className='movies-list-frame'>
            <div className='movies-list-wrapper'>
              <ul className='movies-list'>
                {groupedMovies[moviesYear].map((movie: Movie) => (
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
