import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from 'redux/reducer';
import css from './LogInPage.module.css';

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(logIn(data));
    reset();
  };

  const dispatch = useDispatch();

  return (
    <div className={css.data_container}>
      <div>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={css.title}>Please, login</p>
          <label>
            * Email adress:
            <input {...register('email', { required: true })} type="email" />
            {errors.email && <span>This field is required</span>}
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
            Login
          </button>
        </form>
      </div>
      <div>
        <Link className={css.navregister} to={`/register`}>
          <p className={css.title}>New User</p>
          <button className={css.button}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LogInPage;
