import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovie, IMovieResult } from '../../components/Card/Card.props';

const API_KEY = import.meta.env.VITE_SOME_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchMovies: builder.query<IMovieResult, string>({
      query: (searchQuery) => ({
        url: `/search/tv`,
        params: { query: searchQuery, api_key: API_KEY },
      }),
    }),
    getPopularMovies: builder.query<IMovieResult[], number>({
      query: (page = 1) => ({
        url: `/tv/popular`,
        params: { page, api_key: API_KEY },
      }),
    }),
    getMovieDetails: builder.query<IMovie, number>({
      query: (movieId) => ({
        url: `/tv/${movieId}`,
        params: { api_key: API_KEY },
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieDetailsQuery, useSearchMoviesQuery } = movieApi;
