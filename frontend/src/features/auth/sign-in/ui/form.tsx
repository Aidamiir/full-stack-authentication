import cls from './form.module.scss';

import { toast } from 'react-toastify';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { ROUTES } from '../../../../shared/model';
import { getToastPromiseMessages } from '../../../../shared/lib/utils';
import { type AuthRequestDto, useSignInMutation } from '../../../../entities/user';

export const SignInForm = () => {
  const navigation = useNavigate();
  const [token, setToken] = useState<string>('');

  const [signIn, { isLoading, isError }] = useSignInMutation();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<AuthRequestDto>();

  const onChange = (tokenFromCaptcha: string | null) => setToken(tokenFromCaptcha ?? '');

  const onSubmit: SubmitHandler<AuthRequestDto> = async ({ email, password }) => {
    try {
      await toast.promise(signIn({ email, password, token }).unwrap(), getToastPromiseMessages({
        pending: 'Идёт проверка..',
        success: 'Вход выполнен, добро пожаловать!',
        error: 'Произошла ошибка, проверьте данные или попробуйте позже('
      }));
    }
    catch {}
    finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.field}>
        <label className={`${errors.email || isError ? cls.error : ''} ${cls.label}`}>Email:</label>
        <input className={`default-input ${cls.input} ${errors.email || isError ? cls.error : ''}`} type="email" {...register("email", { required: "Введите ваш email" })} />
      </div>
      <div className={cls.field}>
        <label className={`${errors.password || isError ? cls.error : ''} ${cls.label}`}>Пароль:</label>
        <input className={`default-input ${cls.input} ${errors.password || isError ? cls.error : ''}`} type="password" {...register("password", { required: "Введите ваш пароль" })} />
      </div>
      <ReCAPTCHA className={cls.recaptcha} sitekey={process.env.AUTH_CAPTCHA_SITE_KEY ?? ''} onChange={onChange} />
      <div className={cls.buttons}>
        <button className="button" type="submit" disabled={isLoading}>Войти</button>
        <button className="button" type="button" onClick={() => navigation(ROUTES.signUp)} disabled={isLoading}>Зарегистрироваться</button>
      </div>
    </form>
  )
}

// TODO: обнулять капчу при ошибке, дожидаться загрузки и задать таб индексы