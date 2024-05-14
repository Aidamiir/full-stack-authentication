import { api } from './api';
import type { AuthRequestDto, AuthResponse, CurrentUser } from '../interfaces/auth.interface';

export const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, AuthRequestDto>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<boolean, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    signUp: builder.mutation<AuthResponse, AuthRequestDto>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    currentUser: builder.query<CurrentUser, void>({
      query: () => '/auth/get-current'
    }),
  }),
});