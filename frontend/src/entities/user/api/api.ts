import { api } from '../../../shared/api';
import type { AuthRequestDto, AuthResponse, CurrentUser } from '../model';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, AuthRequestDto>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<AuthResponse, AuthRequestDto>({
      query: (credentials) => ({
        url: '/auth/register',
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
    currentUser: builder.query<CurrentUser, void>({
      query: () => '/auth/get-current'
    }),
  }),
});

export const { signIn, signUp, logout, currentUser } = authApi.endpoints;
export const { useSignInMutation, useSignUpMutation, useLogoutMutation, useCurrentUserQuery } = authApi;