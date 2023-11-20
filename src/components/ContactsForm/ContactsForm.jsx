import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts } from 'redux/contactsReduser';
import css from './ContactForm.module.css';
import { selectContact } from 'redux/selectors';

const ContactsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);

  const onSubmit = data => {
    console.log(data);
    if (contacts.filter(contacts => contacts.name === data.name).length > 0) {
      window.alert(`${data.name} is already in contacts`);
      reset();
      return;
    }
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
