import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@shared/model';
import { useAppSelector } from '@shared/lib/hooks/redux-hooks';

export const RequireAuth = () => {
  const location = useLocation();
  const isAuth = useAppSelector(({ auth }) => auth.user);

  return isAuth ? <Outlet/> : <Navigate to={ROUTES.signIn} state={{ from: location }}/>;
};