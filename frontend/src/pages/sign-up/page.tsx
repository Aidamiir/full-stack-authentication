import cls from './page.module.scss';

import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../shared/model';
import { SignUpForm } from '../../features/auth/sign-up';
import { useAppSelector } from '../../shared/lib/hooks/redux-hooks';

export default function SignUp() {
  const isAuth = useAppSelector(({ auth }) => auth.user);
  if (isAuth) {
    return <Navigate to={ROUTES.root} />
  }

  return (
    <div className="auth-wrapper">
      <h2 className={`${cls.title} title`}>Регистрация</h2>
      <SignUpForm />
    </div>
  );
};