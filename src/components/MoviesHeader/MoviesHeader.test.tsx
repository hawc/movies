import { render, screen } from '@testing-library/react';
import { MoviesHeader } from './MoviesHeader';

describe('renders MoviesHeader', () => {
  render(<MoviesHeader search='' category='' setSearch={() => { }} setCategory={() => { }} getMovies={() => { }} />);

  it('title is correct', () => {
    const linkElement = screen.getByText(/Find your favourite movies/i);
    expect(linkElement).toBeInTheDocument();
  });
});
