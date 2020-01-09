import React from 'react';

import { firestore } from '../../config/firebase';
import UserCard from './UserCard';
import UserPage from './UserPage';

class PendingUsersList extends React.Component {
  state = { listener: null, pendingUsers: [], selectedUser: null };

  componentDidMount() {
    var listener = firestore
      .collection('users')
      .where('verified', '==', false)
      .onSnapshot(snapShot => {
        const pendingUsers = [];
        snapShot.forEach(doc => pendingUsers.push(doc.data()));
        this.setState({ pendingUsers });
      });
    this.setState({ listener });
  }

  componentWillUnmount() {
    this.state.listener();
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

  selectUser = (data) => {
    this.setState({selectedUser: data})
  }

  returnToUsersList = () => {
    this.setState({selectedUser: null})
  }

  renderUsers() {
    const { pendingUsers } = this.state;
    if (pendingUsers.length > 0) {
      return pendingUsers.map(user => {
        return <UserCard key={user.id} data={user} toggle={this.toggleOptionsVisiblity} 
                  selectUser={this.selectUser}/>
      });
    } else {
      return (
        <div className="form-header">
          <h1>No Pending Users Found</h1>
          <p>Currently, there are no unverified users waiting to be verified.</p>
        </div>
      );
    }
  }

  renderUsersOrUser() {
    const { selectedUser } = this.state;
    if (selectedUser) {
      return <UserPage data={this.state.selectedUser} returnToUsersList={this.returnToUsersList}/>
    } else {
      return (
      <div className="users-list disable-scrollbars">
        <div className={'user-list disable-scrollbars'}>{this.renderUsers()}</div>
      </div>
      );
    }
  }

  render() {
    return (
      <div className="sub-container disable-scrollbars">
        {this.renderUsersOrUser()}
      </div>
    );
  }
}

export default PendingUsersList;
