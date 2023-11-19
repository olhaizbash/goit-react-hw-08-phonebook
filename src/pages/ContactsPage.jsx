import { ContactList } from 'components/ContactList/ContactList';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import { Filter } from 'components/Filter/Filter';
import React from 'react';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={css.container}>
      <ContactsForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
