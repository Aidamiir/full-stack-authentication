import { createListenerMiddleware } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api';
import { setUser } from './slice';
import type { CurrentUser } from './types';

export const listenerMiddleware = createListenerMiddleware();

// TODO: исправить any
const fetchCurrentUser = async (api: any) => {
  try {
    api.cancelActiveListeners();

    const token = sessionStorage.getItem('accessToken');
    const headers = new Headers();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    const response = await fetch(process.env.AUTH_API_URL + '/auth/get-current', {
      credentials: 'include',
      headers
    });

    const data = await response.json() as CurrentUser;
    api.dispatch(setUser(data));
  } catch {}
};

listenerMiddleware.startListening({ matcher: signIn.matchFulfilled, effect: async (_, api) => {
  fetchCurrentUser(api);
}});

listenerMiddleware.startListening({ matcher: signUp.matchFulfilled, effect: async (_, api) => {
  fetchCurrentUser(api);
}});
