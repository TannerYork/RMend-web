import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoIosNotifications } from 'react-icons/io';

import { signOut } from '../../redux/actions';
import { auth } from '../../config/firebaseApp';
import './Navbar.css';

class Navbar extends React.Component {
  container = React.createRef();
  state = { userInfoOpen: false };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        userInfoOpen: false
      });
    }
  };

  toggleUserInfo = () => {
    const status = !this.state.userInfoOpen;
    this.setState({ userInfoOpen: status });
  };

  render() {
    const { currentUser } = auth;
    const { signOut } = this.props;
    return (
      <nav className="main-nav no-print">
        {!currentUser && (
          <div id="navbar__logo">
            <Link onClick={this.props.signOut} to="/">
              <img src="images/R.Mend-title.svg" alt="R.Mend Logo" />
            </Link>
          </div>
        )}
        <div />
        {currentUser && (
          <div className="navbar__user-info">
            <IconContext.Provider value={{ className: 'user-notifications' }}>
              <IoIosNotifications />
            </IconContext.Provider>
            <div className="navbar__user-dropdown">
              <img
                onClick={this.toggleUserInfo}
                src={currentUser.photoURL ? currentUser.photoURL : 'images/profile_image_dummy.svg'}
                alt={currentUser.displayName}
              />
              {this.state.userInfoOpen && (
                <div className="navbar__user-dropdown-content" ref={this.container}>
                  <div className="user-dropdown-info">
                    <img
                      src={
                        currentUser.photoURL
                          ? currentUser.photoURL
                          : 'images/profile_image_dummy.svg'
                      }
                      alt={currentUser.displayName}
                    />
                    <p className="user-dropdown-info__displayName">{currentUser.displayName}</p>
                    <p className="user-dropdown-info__email">{currentUser.email}</p>
                  </div>
                  <div className="user-dropdown-signout__wrapper">
                    <button onClick={signOut} className="user-dropdown-signout__button">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* <div className="hamburger" onClick={this.onHamburgerClick}>
          <div className="thick" />
          <div className="thick" />
          <div className="thick" />
        </div> */}
      </nav>
    );
  }
}

const wrappedComponent = withRouter(Navbar);

export default connect(null, { signOut })(wrappedComponent);
