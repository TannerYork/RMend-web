import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { signOut } from '../../actions';
import './Navbar.css';

class Navbar extends React.Component {
  onHamburgerClick() {
    document.querySelector('.sidebar').classList.toggle('is-visible');
  }

  render() {
    return (
      <nav className="main-nav no-print">
        <Link onClick={this.props.signOut} to="/" className="main-nav__logo">
          <img className="main-nav__logo-img" src="images/R.Mend-title.svg" alt="R.Mend Logo" />
        </Link>

        <div className="hamburger" onClick={this.onHamburgerClick}>
          <div className="thick" />
          <div className="thick" />
          <div className="thick" />
        </div>
      </nav>
    );
  }
}

const wrappedComponent = withRouter(Navbar);

export default connect(
  null,
  { signOut }
)(wrappedComponent);
