import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation, useRefreshTokensMutation } from '../../shared/api';
import { ROUTES } from '../../shared/constants/routes';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../slices/auth.slice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigation = useNavigate();
  const [logout] = useLogoutMutation();
  const isAuth = useSelector(selectIsAuthenticated);
  const [refreshTokens, {isLoading: isRefreshLoading}] = useRefreshTokensMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshTokens(undefined).unwrap();
        navigation(ROUTES.root);
      }
      catch {
        logout(undefined).unwrap();
        navigation(ROUTES.signIn);
      }
    };

    fetchData();
  }, [isAuth]);

  return <>
    {isRefreshLoading && <>Loading......</>}
    {isAuth && !isRefreshLoading && children}
  </>;
};