import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authService } from '../api/auth.api';
import { CurrentUser } from '../interfaces/auth.interface';
import { authActions } from '../../slices';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authService.endpoints.signIn.matchFulfilled,

  effect: async (_, api) => {
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
    api.dispatch(authActions.setUser(data));
  }
});
