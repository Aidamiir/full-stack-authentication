import cls from './page.module.scss';

import { Fragment } from 'react';
import { useLogoutMutation } from '../../entities/user';
import { useAppSelector } from '../../shared/lib/hooks/redux-hooks';
import { toast } from 'react-toastify';
import { getToastPromiseMessages } from '../../shared/lib/utils';

export default function Home() {
  const [logout] = useLogoutMutation();
  const user = useAppSelector(({ auth }) => auth.user );

  const handleLogout = async () => {
    await toast.promise(logout(undefined).unwrap(), getToastPromiseMessages({
      pending: 'Подождите..',
      success: 'Вы успешно вышли из аккаунта',
      error: 'Произошла ошибка, попробуйте позже('
    }));
  };

  return (
    <Fragment>
      <header className={cls.header}>
        <div className={`header__container ${cls.container}`}>
          <div>{user?.email}</div>
          <button className="button" onClick={handleLogout}>Выйти</button>
        </div>
      </header>
    </Fragment>
  );
};
