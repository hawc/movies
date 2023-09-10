import { groupBy } from './groupBy';

const data = [
  {
    'Title': 'Movie Title 1',
    'Year': '1899',
  },
  {
    'Title': 'Movie Title 2',
    'Year': '1976',
  },
  {
    'Title': 'Movie Title 3',
    'Year': '1922',
  },
  {
    'Title': 'Movie Title 4',
    'Year': '2014',
  },
  {
    'Title': 'Movie Title 5',
    'Year': '1922',
  },
  {
    'Title': 'Movie Title 6',
    'Year': '2014',
  },
]

describe('group movies by year', () => {
  const groupedMovies = groupBy(data, 'Year');

  it('items are grouped correctly', () => {
    expect(Object.keys(groupedMovies)).toHaveLength(4);
  });

  it('values are like in raw array', () => {
    expect(Object.keys(groupedMovies)).toContain('1976');
    expect(groupedMovies['1976'][0]).toMatchObject({
      'Title': 'Movie Title 2',
      'Year': '1976',
    });
  });
});