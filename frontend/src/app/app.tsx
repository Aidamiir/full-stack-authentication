import 'react-toastify/dist/ReactToastify.min.css';

import { Suspense, lazy, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ROUTES } from '@shared/model';
import { RequireAuth, useCurrentUserQuery } from '@entities/user';

const Home = lazy(() => import('../pages/home/page'));
const SignIn = lazy(() => import('../pages/sign-in/page'));
const SignUp = lazy(() => import('../pages/sign-up/page'));

export const App = () => {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <Fragment>
      <Routes>
        <Route path={ROUTES.signIn} element={<Suspense><SignIn /></Suspense>} />
        <Route path={ROUTES.signUp} element={<Suspense><SignUp /></Suspense>} />
        <Route element={<RequireAuth/>}>
          <Route path={ROUTES.root} element={<Suspense><Home /></Suspense>} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </Fragment>
  );
};

