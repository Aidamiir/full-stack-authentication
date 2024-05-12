import { authService } from './auth.api';

export const {
  useSignInMutation,
  useLogoutMutation,
  useSignUpMutation,
  useRefreshTokensMutation
} = authService