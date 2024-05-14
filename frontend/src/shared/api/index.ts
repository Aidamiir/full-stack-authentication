import { authService } from './auth.api';

export const {
  useSignInMutation,
  useLogoutMutation,
  useSignUpMutation,
  useCurrentUserQuery,
} = authService