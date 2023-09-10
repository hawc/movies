import './Item.css';
import { Link } from 'react-router-dom';
import type { MovieDetails } from 'utils/omdb/types';

const NOT_AVAILABLE = 'N/A';

export function MovieItem({ movie }: { movie: MovieDetails }) {
  return (
    <li className='movie-item'>
      <Link className='movie-item-link' to={`/movie/${movie.imdbID}/`}>
        {movie.Poster && movie.Poster !== NOT_AVAILABLE && (
          <img src={movie.Poster} className='movie-item-image' loading='lazy' alt={`Movie Poster: ${movie.Title}`} />
        )}
        <div className='movie-item-details'>
          {movie.Title}
        </div>
      </Link>
    </li>
  );
}
