import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import SidebarLink from './SidebarLink';
import { signOut } from '../../redux/actions';
import { auth } from '../../config/firebaseApp';
import './Sidebar.css';

class Sidebar extends React.Component {
  toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('is-visible');
  }

  render() {
    return (
      <aside className="sidebar">
        <div id="sidebar__logo">
          <Link onClick={this.props.signOut} to="/">
            <img src="images/R.Mend-title.svg" alt="R.Mend Logo" />
          </Link>
        </div>
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
