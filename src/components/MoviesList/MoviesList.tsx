import { useEffect, useMemo, useState } from 'react';
import { MovieItem } from './Item/Item';
import './MoviesList.css';
import type { Search as Movie } from 'utils/omdb/types';
import { Loader } from 'components/Loader/Loader';

type GroupedMovies = null | { [key: string]: Movie[] };

export function MoviesList({ movies }: { movies: Movie[] }) {
  const movierSorter: Worker = useMemo(
    () => new Worker(new URL("../../workers/groupMovies.ts", import.meta.url)),
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

  const [groupedMovies, setGroupedMovies] = useState<GroupedMovies | null>(null);

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

  return (
    <>
      {loading ? (
        <Loader>
          Nearly done
        </Loader>
      ) : groupedMovies && Object.keys(groupedMovies).sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' })).map((moviesYear: string) => (
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
