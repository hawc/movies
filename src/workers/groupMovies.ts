import { groupBy } from '../utils/groupBy/groupBy';
import type { MovieDetails } from 'utils/omdb/types';

interface GroupMoviesMessageBody {
  data: MovieDetails[];
  type: keyof MovieDetails;
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = (message: MessageEvent<GroupMoviesMessageBody>) => {
  const { data, type } = message.data;
  const result = groupBy<MovieDetails>(data, type);

  postMessage(result);
}
