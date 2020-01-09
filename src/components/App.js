import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { listenForAuthChange } from '../actions';

import Navbar from './navigation/Navbar';
import Sidebar from './navigation/Sidebar';
import Footer from './navigation/Footer';

import SignInPage from './authentication/SignInPage';
import ForgotPasswordPage from './authentication/ForgotPasswordPage';
import RegisturePage from './authentication/RegisturePage';
import UnverifiedPage from './pages/UnverifiedPage';
import ReportList from './reports/ReportList';
import ReportCreate from './reports/ReportCreate';
import UsersList from './users/UserList';
import PendingUsersList from './users/PendingUsersList';
import './App.css';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.listenForAuthChange(this.props.history);
  }

  render() {
    return (
      <div className="root">
        <div className="container no-print">
          <Navbar />
          <Sidebar />
        </div>
        <main className="page no-print">
          <Route path="/" exact component={SignInPage} />
          <Route path="/forgot-password" exact component={ForgotPasswordPage} />
          <Route path="/registure" exact component={RegisturePage} />
          <Route path="/unverified" exact component={UnverifiedPage} />
          <Route path="/reports" exact component={ReportList} />
          <Route path="/reports/new" component={ReportCreate} />
          <Route path="/users" component={UsersList} />
          <Route path="/pending-users" component={PendingUsersList} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { listenForAuthChange }
)(App);
