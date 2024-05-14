import cls from './home.module.scss';

import { Fragment } from 'react';
import { useLogoutMutation } from '../../shared/api';
import { useAppSelector } from '../../shared/hooks/redux-hooks';

export default function HomePage() {
  const [logout] = useLogoutMutation();
  const user = useAppSelector(({ auth }) => auth.user);

  return (
    <Fragment>
      <header className={cls.header}>
        <div className={`header__container ${cls.container}`}>
          <div>{user?.email}</div>
          <button className="button" onClick={async () => await logout(undefined).unwrap()}>Выйти</button>
        </div>
      </header>
    </Fragment>
  );
};
