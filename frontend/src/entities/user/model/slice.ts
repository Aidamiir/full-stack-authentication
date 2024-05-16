import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, AuthState, CurrentUser } from '@entities/user/model/types';
import { currentUser, logout, signIn, signUp } from '@entities/user/api';

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(signIn.matchFulfilled, ( _, action: PayloadAction<AuthResponse>) => {
          sessionStorage.setItem('accessToken', action.payload.accessToken);
        }
      )
      .addMatcher(signUp.matchFulfilled, (_, action: PayloadAction<AuthResponse>) => {
          sessionStorage.setItem('accessToken', action.payload.accessToken);
        }
      )
      .addMatcher(currentUser.matchFulfilled, (state, action: PayloadAction<CurrentUser>) => {
        state.user = action.payload;
      })
      .addMatcher(logout.matchFulfilled, (state) => {
         sessionStorage.clear();
         state.user = null;
        }
      );
  },
});

export const { actions: { setUser }, reducer: authReducer } = authSlice;