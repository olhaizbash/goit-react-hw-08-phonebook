import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registration } from 'redux/reducer';
import { Link } from 'react-router-dom';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(registration(data));
    reset();
  };

  const dispatch = useDispatch();

  return (
    <div className={css.data_container}>
      <div>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            * Email adress:
            <input {...register('email', { required: true })} type="email" />
            {errors.email && <span>This field is required</span>}
          </label>
          <label>
            * Name:
            <input {...register('name', { required: true })} type="text" />
            {errors.name && <span>This field is required</span>}
          </label>
          <label>
            * Password:
            <input
              {...register('password', { required: true })}
              type="password"
            />
            {errors.password && <span>This field is required</span>}
          </label>

          <button className={css.button} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className={css.title}>
        Already have an account? Please,{' '}
        <Link to={`/login`}>
          <span className={css.login}>login.</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
