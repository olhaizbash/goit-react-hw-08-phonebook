import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from 'redux/contactsReduser';
import css from './Modal.module.css';
import { selectId } from 'redux/selectors';

export function Modal({ onClose }) {
  const dispatch = useDispatch();
  const idData = useSelector(selectId);
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    console.log(idData);
    dispatch(editContact({ idData, data }));
    onClose();
  };

  //   const fetch = () => {
  //     dispatch(fetchContacts());
  //   };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.data_container}>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2>New information about contact</h2>
            <label>
              <span>* Name:</span>
              <input {...register('name', { required: true })} type="text" />
              {errors.email && <span>This field is required</span>}
            </label>
            <label>
              <span>* Phone number:</span>
              <input {...register('number', { required: true })} type="tel" />
              {errors.password && <span>This field is required</span>}
            </label>

            <button className={css.button} type="submit">
              Edit contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
