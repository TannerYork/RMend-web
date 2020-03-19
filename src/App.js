import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { listenForAuthChange } from '../actions';

import Navbar from './navigation/Navbar';
import Sidebar from './navigation/Sidebar';
import Footer from './navigation/Footer';

import SignInPage from './pages/authentication/SignInPage';
import ForgotPasswordPage from './pages/authentication/ForgotPasswordPage';
import ReportList from './reports/ReportList';
import ReportCreate from './reports/ReportCreate';
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
          <Route path="/reports" exact component={ReportList} />
          {/* <Route path="/reports/new" component={ReportCreate} /> */}
        </main>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { listenForAuthChange })(App);
