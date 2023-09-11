import { fetchData } from './fetch';
import type { FetchResponse, ErrorResponse } from 'utils/omdb/types';

const fetchUrl = `${process.env.REACT_APP_OMDB_API}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=tt9362722`;
const mockedResponse: FetchResponse = { "Title": "Spider-Man: Across the Spider-Verse", "Year": "2023", "Rated": "PG", "Released": "02 Jun 2023", "Runtime": "140 min", "Genre": "Animation, Action, Adventure", "Director": "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson", "Writer": "Phil Lord, Christopher Miller, Dave Callaham", "Actors": "Shameik Moore, Hailee Steinfeld, Brian Tyree Henry", "Plot": "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a ...", "Language": "English", "Country": "United States", "Awards": "3 wins & 1 nomination", "Poster": "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.7/10" }, { "Source": "Rotten Tomatoes", "Value": "95%" }, { "Source": "Metacritic", "Value": "86/100" }], "Metascore": "86", "imdbRating": "8.7", "imdbVotes": "252,325", "imdbID": "tt9362722", "Type": "movie", "DVD": "08 Aug 2023", "BoxOffice": "$381,281,287", "Production": "N/A", "Website": "N/A", "Response": "True" };

const fetchErrorUrl = `${process.env.REACT_APP_OMDB_API}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=notValid`;
const mockedErrorResponse: ErrorResponse = { "Response": "False", "Error": "Error converting data type varchar to int." };

const movieFetchMock = () => Promise.resolve({
  ok: true,
  status: 200,
  json: async () => mockedResponse
} as Response);

describe('Fetch movie data and receive okay response', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(movieFetchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Call the OMDB API with valid parameters', () => {
    let response: unknown;

    beforeEach(async () => {
      response = await fetchData(fetchUrl);
    });

    it('The movie object should be returned', () => {
      expect(response).toEqual(mockedResponse);
    });
  });
});

const movieFetchErrorMock = () => Promise.resolve({
  ok: false,
  status: 400,
  json: async () => mockedErrorResponse
} as Response);

describe('Fetch movie data and receive not okay response', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(movieFetchErrorMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Call the OMDB API with invalid parameters', () => {
    let response: unknown;
    console.error = jest.fn();

    beforeEach(async () => {
      response = await fetchData(fetchErrorUrl);
    });

    it('The movie object should not be returned', () => {
      expect(response).toEqual(null);
    });

    it('An error should have been logged', () => {
      expect(console.error).toHaveBeenCalledWith('HTTP Response Code: 400');
    });
  });
});