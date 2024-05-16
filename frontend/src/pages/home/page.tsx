import cls from './page.module.scss';

import cn from 'classnames';
import { Fragment } from 'react';
import { toast } from 'react-toastify';

import { useLogoutMutation } from '@entities/user';
import { getToastPromiseMessages } from '@shared/lib/utils';
import { useAppSelector } from '@shared/lib/hooks/redux-hooks';

export default function Home() {
  const [logout] = useLogoutMutation();
  const user = useAppSelector(({ auth }) => auth.user );

  const handleLogout = async () => {
    await toast.promise(logout().unwrap(), getToastPromiseMessages({
      pending: 'Подождите..',
      success: 'Вы успешно вышли из аккаунта',
      error: 'Произошла ошибка, попробуйте позже('
    }));
  };

  return (
    <Fragment>
      <header className={cls.header}>
        <div className={cn('header__container', cls.container)}>
          <div>{user?.email ?? ''}</div>
          <button className="button" onClick={handleLogout}>Выйти</button>
        </div>
      </header>
    </Fragment>
  );
};