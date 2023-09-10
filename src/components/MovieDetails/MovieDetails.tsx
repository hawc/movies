import './MovieDetails.css';
import { Link } from 'react-router-dom';
import type { FetchResponse as Movie } from 'utils/omdb/types';

export function MovieDetails({ movie }: { movie: Movie }) {
  return (
    <section>
      <h1 className='movie-details-headline'>
        {movie.Title}
      </h1>
      <div className='movie-details-wrapper'>
        {movie.Poster && movie.Poster !== 'N/A' && (
          <div className='movie-details-poster-wrapper'>
            <img
              src={movie.Poster}
              className='movie-details-poster'
              alt={`Movie Poster: ${movie.Title}`} />
          </div>
        )}
        <div className='movie-details-content'>
          {movie.Country && movie.Country !== 'N/A' && (
            <>
              <h2>Country</h2>
              <p>{movie.Country}</p>
            </>
          )}
          {movie.Year && (
            <>
              <h2>Year</h2>
              <p>{movie.Year}</p>
            </>
          )}
          {movie.Language && movie.Language !== 'N/A' && (
            <>
              <h2>Language</h2>
              <p>{movie.Language}</p>
            </>
          )}
          {movie.Actors && movie.Actors !== 'N/A' && (
            <>
              <h2>Actors</h2>
              <p>{movie.Actors}</p>
            </>
          )}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <>
              <h2>Plot</h2>
              <p>{movie.Plot}</p>
            </>
          )}
          <p className='movie-details-imdb-link'>
            <Link to={`https://imdb.com/title/${movie.imdbID}`} target='_blank' rel='noopener'>Visit IMDb page</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
