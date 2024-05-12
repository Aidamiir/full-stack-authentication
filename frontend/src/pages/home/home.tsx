import { useAppSelector } from '../../shared/hooks/redux-hooks';
import { useLogoutMutation } from '../../shared/api';
import { User } from '../../shared/interfaces/auth.interface';
import cls from './home.module.scss';

export const HomePage = () => {
  const user: User | null = useAppSelector(({ auth }) => auth.user);
  const [logout] = useLogoutMutation();

  return (
    <>
      <header className={cls.header}>
        <div className={`header__container ${cls.container}`}>
          <div>{user?.email}</div>
          <button className="button" onClick={async () => await logout(undefined).unwrap()}>Выйти</button>
        </div>
      </header>
    </>
  );
};
