import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import SearchContacts from './SearchContacts';

class ListContacts extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = query => {
    this.setState({
      query: query.trim()
    });
  };

  clearQuery = () => {
    this.setState({
      query: ''
    });
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter(contact => contact.name.match(match));
    } else {
      showingContacts = contacts;
    }
    showingContacts.sort(sortBy('name'));
    return (
      <div className='list-contacts'>
        <SearchContacts inputValue={query} onInputChange={this.updateQuery} />
        {query ? (
          <div className='showing-contacts'>
            <span>
              Showing {showingContacts.length} of all {contacts.length} contacts
            </span>
            <button
              className='showing-contacts button'
              onClick={this.clearQuery}
            >
              Show all
            </button>
          </div>
        ) : null}
        <ol className='contact-list'>
          {showingContacts.map(contact => {
            return (
              <li key={contact.id} className='contact-list-item'>
                <img
                  src={contact.avatarURL}
                  className='contact-avatar'
                  alt=''
                />
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button
                  className='contact-remove'
                  onClick={() => onDeleteContact(contact)}
                ></button>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
