import cls from './form.module.scss';

import cn from 'classnames';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { ROUTES } from '@shared/model';
import { getToastPromiseMessages } from '@shared/lib/utils';
import { type AuthRequestDto, useSignUpMutation } from '@entities/user';

export const SignUpForm = () => {
  const navigation = useNavigate();
  const [token, setToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<AuthRequestDto>();

  const onSubmit: SubmitHandler<AuthRequestDto> = async ({ email, password }) => {
    try {
      if (!token) {
        toast.error('Пройдите капчу!');
      }
      else {
        await toast.promise(signUp({ email, password, token }).unwrap(), getToastPromiseMessages({
          pending: 'Идёт проверка..',
          success: 'Регистрация прошла успешно, добро пожаловать!',
          error: 'Произошла ошибка, проверьте данные или попробуйте позже(',
        }));
        reset();
      }
    }
    catch {
      reset();
      setCaptchaKey(prevKey => prevKey + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.field}>
        <label className={cn(cls.label, { [cls.error]: isError || errors.email })}>Email:</label>
        <input className={cn('default-input', cls.input, { [cls.error]: isError || errors.email })} type="email" {...register("email", { required: "Введите ваш email" })} />
      </div>
      <div className={cls.field}>
        <label className={cn(cls.label, { [cls.error]: isError || errors.password })}>Пароль:</label>
        <input className={cn('default-input', cls.input, { [cls.error]: isError || errors.password })} type="password" {...register("password", { required: "Введите ваш пароль" })} />
      </div>
      <ReCAPTCHA className={cls.recaptcha} key={captchaKey} sitekey={process.env.AUTH_CAPTCHA_SITE_KEY ?? ''} onChange={(tokenFromCaptcha) => setToken(tokenFromCaptcha ?? '')} />
      <div className={cls.buttons}>
        <button className="button" type="submit" disabled={isLoading}>Зарегистрироваться</button>
        <button className="button" type="button" onClick={() => navigation(ROUTES.signIn)} disabled={isLoading}>Войти</button>
      </div>
    </form>
  );
};