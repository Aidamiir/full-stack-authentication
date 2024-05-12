import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/main';

export const api = createApi({
  reducerPath: 'split-api',
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
});