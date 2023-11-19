import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'redux/reducer';
import { selectUserName } from 'redux/selectors';
import css from './UserData.module.css';

export const UserData = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const onLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.user_container}>
      <p className={css.title}>
        Hello, <span>{name}</span>
      </p>
      <button className={css.buttonLogOut} onClick={onLogOut}>
        Log out
      </button>
    </div>
  );
};

export default UserData;
