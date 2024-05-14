import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../shared/api/auth.api';

import type { AuthResponse, AuthState, CurrentUser } from '../shared/interfaces/auth.interface';

const { currentUser, signIn, logout, signUp } = authService.endpoints;

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(currentUser.matchFulfilled, (state, action: PayloadAction<CurrentUser>) => {
        state.user = action.payload;
      })
      .addMatcher(signIn.matchFulfilled, ( _, action: PayloadAction<AuthResponse>) => {
          sessionStorage.setItem('accessToken', action.payload.accessToken);
        }
      )
      .addMatcher(logout.matchFulfilled, (state) => {
         sessionStorage.clear();
         state.user = null;
        }
      )
      .addMatcher(signUp.matchFulfilled, (_, action: PayloadAction<AuthResponse>) => {
          sessionStorage.setItem('accessToken', action.payload.accessToken);
        }
      );
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;