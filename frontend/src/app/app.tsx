import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './hoc';
import { ROUTES } from '../shared/constants';
import { useCurrentUserQuery } from '../shared/api';

const HomePage = lazy(() => import('../pages/home/home'));
const SignInPage = lazy(() => import('../pages/sign-in/sing-in'));
const SignUpPage = lazy(() => import('../pages/sign-up/sign-up'));

export const App = () => {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<Suspense><SignInPage /></Suspense>} />
      <Route path={ROUTES.signUp} element={<Suspense><SignUpPage /></Suspense>} />
      <Route element={<RequireAuth/>}>
        <Route path={ROUTES.root} element={<Suspense><HomePage /></Suspense>} />
      </Route>
    </Routes>
  );
};

