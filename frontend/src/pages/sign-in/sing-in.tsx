import cls from  './sign-in.module.scss';

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../shared/hooks/redux-hooks';

import { useSignInMutation } from '../../shared/api';
import { ROUTES } from '../../shared/constants';
import type { AuthRequestDto } from '../../shared/interfaces/auth.interface';

export default function SignInPage() {
  const navigation = useNavigate();
  const [token, setToken] = useState<string>('');
  const isAuth = useAppSelector(({ auth }) => auth.user);
  const [signIn, { isLoading, isError }] = useSignInMutation();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<AuthRequestDto>();

  const onSubmit: SubmitHandler<AuthRequestDto> = async ({ email, password }) => {
    try {
      await signIn({ email, password, token }).unwrap();
    }
    catch (error) {
      // TODO: переделать в тосты
      console.error('Ошибка при входе:', error);
    }
    finally {
      reset();
    }
  };

  const onChange = (tokenFromCaptcha: string | null) => {
    setToken(tokenFromCaptcha ?? '');
  };

  if (isAuth) {
    return <Navigate to={ROUTES.root} />;
  }

  return (
    <div className="auth-wrapper">
      <div>
        <h2 className={`${cls.title} title`}>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.field}>
            <label className={`${errors.email || isError ? cls.error : '' } ${cls.label}`}>Email:</label>
            <input className={`default-input ${cls.input} ${errors.email || isError ? cls.error : ''}`} type="email" {...register("email", { required: "Введите ваш email" })} />
          </div>
          <div className={cls.field}>
            <label className={`${errors.password || isError ? cls.error : '' } ${cls.label}`}>Пароль:</label>
            <input  className={`default-input ${cls.input} ${errors.password || isError ? cls.error : ''}`} type="password" {...register("password", { required: "Введите ваш пароль" })} />
          </div>
          <ReCAPTCHA className={cls.recaptcha} sitekey={process.env.AUTH_CAPTCHA_SITE_KEY ?? ''} onChange={onChange} />
          <div className={cls.buttons}>
            <button className="button" type="submit" disabled={isLoading}>Войти</button>
            <button className="button" type="button" onClick={() => navigation(ROUTES.signUp)} disabled={isLoading}>Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
};