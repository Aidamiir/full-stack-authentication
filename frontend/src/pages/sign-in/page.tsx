import cls from './page.module.scss';

import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../shared/model';
import { SignInForm } from '../../features/auth/sign-in';
import { useAppSelector } from '../../shared/lib/hooks/redux-hooks';

export default function SignIn() {
  const isAuth = useAppSelector(({ auth }) => auth.user);
  if (isAuth) {
    return <Navigate to={ROUTES.root} />;
  }

  return (
    <div className="auth-wrapper">
      <h2 className={`${cls.title} title`}>Вход</h2>
      <SignInForm />
    </div>
  );
};