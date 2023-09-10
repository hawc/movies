import './MoviesHeader.css';
import { Button } from 'components/Form/Button/Button';
import { FormRow } from 'components/Form/FormRow/FormRow';
import { Input } from 'components/Form/Input/Input';
import type { Dispatch, SetStateAction } from 'react';

export function MoviesHeader({ search, getMovies, setSearch }: { search: string, getMovies: () => void, setSearch: Dispatch<SetStateAction<string>> }) {
  return (
    <div className='movies-header-wrapper'>
      <div className='movies-header'>
        <h1 className='movies-header-headline'>
          Find your favourite movies
        </h1>
        <FormRow>
          <Input value={search} onChange={setSearch} onEnter={getMovies} placeholder='Enter a movie title' />
          <Button className='primary' onClick={getMovies}>
            Load Movies
          </Button>
        </FormRow>
      </div>
    </div>
  );
}
