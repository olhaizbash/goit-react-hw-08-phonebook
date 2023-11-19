import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from 'redux/contactsReduser';
import css from './ContactForm.module.css';

const ContactsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log(data);
    dispatch(addContact(data));
    reset();
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.data_container}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Name:</span>
          <input {...register('name', { required: true })} type="text" />
          {errors.email && <span>This field is required</span>}
        </label>
        <label>
          <span>Phone number:</span>
          <input {...register('number', { required: true })} type="tel" />
          {errors.password && <span>This field is required</span>}
        </label>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;
