import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store/store';
import { AuthState } from '../shared/interfaces/auth.interface';
import { authService } from '../shared/api/auth.api';

const initialState: AuthState = {
  isAuth: false,
  user: null,
  accessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: () => ({}),
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authService.endpoints.signIn.matchFulfilled,
        (state, action) => {
          state.isAuth = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addMatcher(
        authService.endpoints.refreshTokens.matchFulfilled,
        (state, action) => {
          if (action.payload.user && action.payload.accessToken) {
            state.isAuth = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
          }
        }
      )
      .addMatcher(
        authService.endpoints.logout.matchFulfilled,
        (state) => {
          state.isAuth = false;
          state.user = null;
          state.accessToken = null;
        }
      )
      .addMatcher(
        authService.endpoints.signUp.matchFulfilled,
        (state, action) => {
          state.isAuth = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      );
  },
});

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuth;
export default authSlice.reducer;