import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUsers } from '../../actions';
import { firestore } from '../../config/firebase';
import SelectedUserForm from '../users/SelectedUserForm';
import UserList from '../users/UserList';
import UserPendingList from '../users/UserPendingList';

class UsersPage extends React.Component {
  state = { lisenter: null };

  async componentDidMount() {
    var lisenter = await firestore
      .collection('users')
      .where('verified', '==', true)
      .onSnapshot(snapShot => {
        const users = [];
        snapShot.docs.forEach(doc => {
          users.push(doc.data());
        });
        this.props.fetchUsers(users);
      });
    this.setState({ lisenter });
  }

  componentWillUnmount() {
    this.state.lisenter();
  }

  render() {
    const { match, users } = this.props;
    return (
      <div className="sub-container disable-scrollbars">
        <Route path={match.path} component={UserList} users={users} />
        <Route path={`${match.path}/pending`} component={UserPendingList} />
        <Route path={`${match.path}/user/:userId`} component={SelectedUserForm} data={{}} />
        <Route path={`${match.path}/pending-user/:userId`} component={SelectedUserForm} data={{}} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    users: firestore.users
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UsersPage);
