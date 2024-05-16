import { createListenerMiddleware, ListenerEffectAPI, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

import { signIn, signUp } from '../api';
import { setUser } from '@entities/user/model/slice';

import type { CurrentUser } from './types';

export const listenerMiddleware = createListenerMiddleware();

const fetchCurrentUser = async (api: ListenerEffectAPI<unknown, ThunkDispatch<unknown, unknown, UnknownAction>>) => {
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