import React from 'react';

import UserCard from './UserCard';
import './UserList.css';

class UserList extends React.Component {
  toggleOptionsVisiblity(id) {
    const userCards = document.querySelectorAll('.user-list__item-container');
    userCards.forEach(card => {
      if (card.classList.contains('is-visible') && card.classList.contains('current')) {
        card.classList.remove('is-visible');
        card.classList.remove('current');
      } else if (card.classList.contains('is-visible')) {
        card.classList.remove('is-visible');
      } else if (card.id === id) {
        card.classList.add('is-visible');
        card.classList.add('current');
      }
    });
  }

  renderUsers() {
    const { users } = this.props;
    if (users.length > 0) {
      const usersList = users.map(user => (
        <UserCard key={user.id} data={user} toggle={this.toggleOptionsVisiblity} />
      ));
      return usersList;
    } else {
      return (
        <div className="form-header">
          <h1>No Users Found</h1>
          <p>Currently, there are no verified users.</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="list-container sub-container disable-scrollbars">
        <div className={'user-list disable-scrollbars'}>{this.renderUsers()}</div>
      </div>
    );
  }
}

export default UserList;
