import React from 'react';

import UserCard from './UserCard';
import { firestore } from '../../config/firebase';
import { connect } from 'react-redux';
import { fetchPendingUsers } from '../../actions';

class UserListPending extends React.Component {
  state = { listener: null, pendingUsers: [] };

  componentDidMount() {
    var listener = firestore
      .collection('users')
      .where('verified', '==', false)
      .onSnapshot(snapShot => {
        const pendingUsers = [];
        snapShot.forEach(doc => pendingUsers.push(doc.data()));
        this.setState({ pendingUsers })
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

  renderUsers() {
    const { pendingUsers } = this.state;
    if (pendingUsers.length > 0) {
      pendingUsers.forEach(user => {
        return <UserCard data={user} toggle={this.toggleOptionsVisiblity} />;
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

  render() {
    return (
      <div className="users-list disable-scrollbars">
        <div className="user-list disable-scrollbars">{this.renderUsers()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return { pendingUsers: firestore.pendingUsers };
};

export default connect(
  mapStateToProps,
  { fetchPendingUsers }
)(UserListPending);
