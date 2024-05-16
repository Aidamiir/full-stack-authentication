import cls from './form.module.scss';

import cn from 'classnames';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { ROUTES } from '@shared/model';
import { getToastPromiseMessages } from '@shared/lib/utils';
import { type AuthRequestDto, useSignInMutation } from '@entities/user';

export const SignInForm = () => {
  const navigation = useNavigate();
  const [token, setToken] = useState<string>('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [signIn, { isLoading, isError }] = useSignInMutation();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<AuthRequestDto>();

  const onSubmit: SubmitHandler<AuthRequestDto> = async ({ email, password }) => {
    try {
      await toast.promise(signIn({ email, password, token }).unwrap(), getToastPromiseMessages({
        pending: 'Идёт проверка..',
        success: 'Вход выполнен, добро пожаловать!',
        error: 'Произошла ошибка, проверьте данные или попробуйте позже('
      }));
    }
    catch {
      setCaptchaKey(prevKey => prevKey + 1);
    }
    finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.field}>
        <label className={cn(cls.label, { [cls.error]: isError || errors.email })}>Email:</label>
        <input className={cn('default-input', cls.input, { [cls.error]: isError || errors.email })} type="email" {...register('email', { required: 'Введите ваш email' })} />
      </div>
      <div className={cls.field}>
        <label className={cn(cls.label, { [cls.error]: isError || errors.password })}>Пароль:</label>
        <input className={cn('default-input', cls.input, { [cls.error]: isError || errors.email })} type="password" {...register("password", { required: "Введите ваш пароль" })} />
      </div>
      <ReCAPTCHA className={cls.recaptcha} key={captchaKey} sitekey={process.env.AUTH_CAPTCHA_SITE_KEY ?? ''} onChange={(tokenFromCaptcha) => setToken(tokenFromCaptcha ?? '')} />
      <div className={cls.buttons}>
        <button className="button" type="submit" disabled={isLoading}>Войти</button>
        <button className="button" type="button" onClick={() => navigation(ROUTES.signUp)} disabled={isLoading}>Зарегистрироваться</button>
      </div>
    </form>
  );
};