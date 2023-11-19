import { setFilter } from 'redux/contactsReduser';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div className={css.form}>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          onChange={e => dispatch(setFilter(e.target.value))}
        />
      </label>
    </div>
  );
};
