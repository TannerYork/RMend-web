import React from 'react';

import { firestore } from '../../config/firebase'
import UserCard from './UserCard';
import './UserList.css';

class UserList extends React.Component {
  state = { listener: null, users: []}

  componentDidMount() {
    const listener = firestore.collection('users')
    .where('verified', '==', true)
    .onSnapshot((snapShot) => {
      const users = []
      snapShot.forEach((doc) => users.push(doc.data()))
      this.setState({ users })
    })
    this.setState({ listener })
  }

  componentWillUnmount() {
    this.state.listener()
  }

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
    const { users } = this.state;
    if (users && users.length > 0) {
      return users.map(user => {
        return <UserCard key={user.id} data={user} toggle={this.toggleOptionsVisiblity} />
      });
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
      <div className="users-list disable-scrollbars">
        <div className={'user-list disable-scrollbars'}>{this.renderUsers()}</div>
      </div>
    );
  }
}

export default UserList;
