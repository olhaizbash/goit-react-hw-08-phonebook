import css from './ContactList.module.css';
import {
  selectContact,
  selectContactIsLoading,
  selectContactsError,
  selectContactsFilter,
} from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsReduser';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { setId } from 'redux/contactsReduser';

export const ContactList = () => {
  const contacts = useSelector(selectContact);
  const isLoading = useSelector(selectContactIsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectContactsFilter);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase().trim());
  });
  return (
    <ul className={css.list}>
      <h2 className={css.title}>Your contacts list:</h2>
      {isLoading && <Loader />}
      {error && <div>Sorry, there are no contacts in your phonebook</div>}
      {contacts !== null &&
        filteredContacts.map(({ id, name, number }) => {
          return (
            <li className={css.listContacts} key={id}>
              {name}: <span>{number}</span>
              <button
                className={css.button}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </button>
              <button
                className={css.button}
                onClick={() => {
                  openModal();
                  console.log(id);
                  dispatch(setId(id));
                }}
                type="button"
              >
                Edit
              </button>
              {isModalOpen && (
                <Modal
                  onClose={() => {
                    closeModal();
                  }}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
};
