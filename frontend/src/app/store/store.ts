import { configureStore } from '@reduxjs/toolkit';

import { api } from '../../shared/api/api';
import { authReducer } from '../../slices';
import { listenerMiddleware } from '../../shared/utils';

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

export type RootState = ReturnType<typeof store.getState>;