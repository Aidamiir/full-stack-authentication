import { retry, BaseQueryFn, fetchBaseQuery, type FetchBaseQueryError, type FetchArgs } from '@reduxjs/toolkit/query/react';

type TQueryWithReAuth = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.AUTH_API_URL,

  prepareHeaders: (headers: Headers): Headers => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },

  credentials: 'include',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const baseQueryWithReAuth: TQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQueryWithRetry(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const response = await baseQuery({url: '/auth/sign-in/refresh-token', method: 'POST'}, api, extraOptions);
    const data = response.data as { accessToken: string };

    if (data) {
      sessionStorage.setItem('accessToken', data.accessToken);
      result = await baseQueryWithRetry(args, api, extraOptions);
    }
    else {
      await baseQuery({url: '/auth/logout', method: 'POST'}, api, extraOptions);
      sessionStorage.clear();
    }
  }

  return result;
};
