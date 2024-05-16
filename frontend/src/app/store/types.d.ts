import { store } from '@/app';

declare global {
  type AppDispatch = typeof store.dispatch;

  type RootState = ReturnType<typeof store.getState>;
}
