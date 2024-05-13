import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../shared/api';
import { ROUTES } from '../../shared/constants/routes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '../../shared/interfaces/auth.interface';
import cls from  './sign-up.module.scss';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const SignUpPage = () => {
  const navigation = useNavigate();
  const [token, setToken] = useState('');
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<Credentials>();

  const onSubmit: SubmitHandler<Credentials> = async ({ email, password }) => {
    try {
      await signUp({ email, password, token }).unwrap();
      navigation(ROUTES.root);
    }
    catch (error) {
      console.error('Ошибка при входе:', error);
    }
    finally {
      reset();
    }
  };

  const onChange = (token: any) => {
    setToken(token);
  };

  return (
    <div className="auth-wrapper">
      <div>
        <h2 className={`${cls.title} title`}>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.field}>
            <label className={`${errors.email || isError ? cls.error : '' } ${cls.label}`}>Email:</label>
            <input className={`default-input ${cls.input} ${errors.email || isError ? cls.error : ''}`} type="email" {...register("email", { required: "Введите ваш email" })} />
          </div>
          <div className={cls.field}>
            <label className={`${errors.email || isError ? cls.error : '' } ${cls.label}`}>Пароль:</label>
            <input className={`default-input ${cls.input} ${errors.email || isError ? cls.error : ''}`} type="password" {...register("password", { required: "Введите ваш пароль" })} />
          </div>
          <ReCAPTCHA className={cls.recaptcha} sitekey="6LcdztopAAAAAP5pG1HofPXWwrEfoFzT6-MLtPkM" onChange={onChange} />
          <div className={cls.buttons}>
            <button className="button" type="submit" disabled={isLoading}>Зарегистрироваться</button>
            <button className="button" type="button" onClick={() => navigation(ROUTES.signIn)} disabled={isLoading}>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

