import './MoviesHeader.css';
import { Button } from 'components/Form/Button/Button';
import { FormRow } from 'components/Form/FormRow/FormRow';
import { Input } from 'components/Form/Input/Input';
import { Dropdown } from 'components/Form/Dropdown/Dropdown';
import { MOVIE_CATEGORIES } from 'utils/omdb/api';
import type { Dispatch, SetStateAction } from 'react';

export function MoviesHeader({ search, category, getMovies, setSearch, setCategory }: { search: string, category: string, getMovies: () => void, setSearch: Dispatch<SetStateAction<string>>, setCategory: Dispatch<SetStateAction<string>> }) {
  return (
    <div className='movies-header-wrapper'>
      <div className='movies-header'>
        <h1 className='movies-header-headline'>
          Find your favourite movies and series
        </h1>
        <FormRow>
          <Dropdown onChange={setCategory} onEnter={getMovies} options={MOVIE_CATEGORIES} value={category} />
          <Input value={search} onChange={setSearch} onEnter={getMovies} placeholder={category === 'series' ? 'Enter a series title' : 'Enter a movie title'} />
          <Button className='primary' onClick={getMovies}>
            Search
          </Button>
        </FormRow>
      </div>
    </div>
  );
}
