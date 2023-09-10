import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovie } from 'utils/omdb/api';
import type { FetchResponse } from 'utils/omdb/types';

export function Movie() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [movie, setMovie] = useState<FetchResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const getMovie = async (slug: string) => {
    const movieResult = await fetchMovie(slug);
    if (movieResult) {
      setMovie(movieResult);
      setLoading(false);
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getMovie(slug);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading || !movie) {
    return (
      <Loader>
        Please wait
      </Loader>
    );
  }

  return (
    <MovieDetails movie={movie} />
  );
}
