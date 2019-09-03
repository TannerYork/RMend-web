import React from 'react';

import UserCard from './UserCard';
import { firestore } from '../../config/firebase';
import { connect } from 'react-redux';
import { fetchPendingUsers } from '../../actions';

class UserListPending extends React.Component {
  state = { lisenter: null };

  async componentDidMount() {
    var lisenter = await firestore
      .collection('users')
      .where('verified', '==', false)
      .onSnapshot(snapShot => {
        const users = [];
        snapShot.forEach(doc => users.push(doc.data()));
        this.props.fetchPendingUsers(users);
      });
    this.setState({ lisenter });
  }

  componentWillUnmount() {
    this.state.lisenter();
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
    const { pendingUsers } = this.props;
    if (pendingUsers > 0) {
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
      <div className="list-container sub-container disable-scrollbars">
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
