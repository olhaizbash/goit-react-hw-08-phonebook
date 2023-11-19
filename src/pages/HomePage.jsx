import React from 'react';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <h2>Hello! Welcome to your personal phonebook!</h2>
      <div>
        Phonebook with most accurate information about your contacts. Maintains
        itself automatically based on your contact's input about their phone
        number and all other details.
        <ul>Features:</ul> <li>View and edit your contacts in one place</li>{' '}
        <li>
          Keep your contacts organized well with extremely powerful suggestions
        </li>
        <li>View desired contact information</li>
        <li>Create and edit contact</li>
        <li>Easily access functions you need right now.</li>
      </div>
      <h2>Just login and start using it!</h2>
    </div>
  );
};

export default HomePage;
