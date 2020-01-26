import React from 'react';
import { Link } from 'react-router-dom';

const SearchContacts = props => {
  return (
    <div className='list-contacts-top'>
      <input
        className='search-contacts'
        type='text'
        placeholder='Search contacts'
        value={props.inputValue}
        onChange={event => props.onInputChange(event.target.value)}
      />
      <Link to='/create' className='add-contact' />
    </div>
  );
};

export default SearchContacts;
