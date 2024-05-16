import { configureStore } from '@reduxjs/toolkit';

import { api } from '@shared/api';
import { authReducer, listenerMiddleware } from '@entities/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    return defaultMiddleware.concat([listenerMiddleware.middleware, api.middleware]);
  },
});