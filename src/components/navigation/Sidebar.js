import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import SidebarLink from './SidebarLink';
import { signOut } from '../../redux/actions';
import './Sidebar.css';

class Sidebar extends React.Component {
  toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('is-visible');
  }

  renderCurrentUserInfo() {
    const { user } = this.props;
    if (user) {
      return (
        <Link to="/user-info">
          <div className="current-user__info">
            <h4 className="current-user__name">{user.displayName}</h4>
          </div>
        </Link>
      );
    }
  }

  renderSidebarList() {
    const { isSignedIn, tokens, signOut } = this.props;
    if (!this.props.isSignedIn) {
      return <button onClick={this.toggleSidebar}>Sign In</button>;
    }

    if (isSignedIn && tokens && tokens.moderator) {
      return (
        <ul className="sidebar__list">
          <SidebarLink to="/reports">View Reports</SidebarLink>
          <SidebarLink to="/reports/new" type="problem">
            Report a Problem
          </SidebarLink>
          <SidebarLink to="/users">Current Users</SidebarLink>
          <SidebarLink to="/pending-users">Pending Users</SidebarLink>
          <button onClick={signOut}>Sign Out</button>
        </ul>
      );
    }

    console.log('Checking for verifed user');
    if (isSignedIn && tokens && tokens.verifed) {
      return (
        <ul className="sidebar__list">
          <SidebarLink to="/reports">View Reports</SidebarLink>
          <SidebarLink to="/reports/new" type="problem">
            Report a Problem
          </SidebarLink>
          <button onClick={signOut}>Sign Out</button>;
        </ul>
      );
    }

    return <button onClick={signOut}>Sign Out</button>;
  }

  render() {
    return (
      <aside className="sidebar">
        {this.renderCurrentUserInfo()}
        {this.renderSidebarList()}
      </aside>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isSignedIn: auth.isSignedIn,
    user: auth.user,
    tokens: auth.tokens ? auth.tokens : null
  };
};

export default withRouter(connect(mapStateToProps, { signOut })(Sidebar));
