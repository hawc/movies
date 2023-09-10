import { groupBy } from '../utils/groupBy/groupBy';
import type { Search as Movie } from 'utils/omdb/types';

interface GroupMoviesMessageBody {
  data: Movie[];
  type: keyof Movie;
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = (message: MessageEvent<GroupMoviesMessageBody>) => {
  const messageBody = message.data;
  const movies = messageBody.data;
  const sortType = messageBody.type;
  const result = groupBy<Movie>(movies, sortType);

  postMessage(result);
}
