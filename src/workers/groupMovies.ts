import { groupBy } from '../utils/groupBy/groupBy';
import type { MovieDetails } from 'utils/omdb/types';

interface GroupMoviesMessageBody {
  data: MovieDetails[];
  type: keyof MovieDetails;
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = (message: MessageEvent<GroupMoviesMessageBody>) => {
  const messageBody = message.data;
  const movies = messageBody.data;
  const sortType = messageBody.type;
  const result = groupBy<MovieDetails>(movies, sortType);

  postMessage(result);
}
