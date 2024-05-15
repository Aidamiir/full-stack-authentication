import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './query';

export const api = createApi({
  reducerPath: 'split-api',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});