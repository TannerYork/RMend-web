import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import GoogleSignInButton from '../firebase/GoogleSignInButton';
import { signInWithEmailAndPassword } from '../../actions';
import './SignInPage.css';

class SignInPage extends React.Component {
  renderError = ({ touched, error }) => {
    return touched && error ? error : '';
  };

  renderEmailInput = ({ input, label, meta }) => {
    return (
      <div className="form-row">
        <label>{label}</label>
        <input placeholder={this.renderError(meta)} type="text" {...input} />
      </div>
    );
  };

  renderPasswordInput = ({ input, label, meta }) => {
    return (
      <div className="form-row">
        <div className="form-label">
          <label>{label}</label>
          <p>
            Forgot <Link to={`/forgot-password`}>Password</Link>?
          </p>
        </div>
        <input placeholder={this.renderError(meta)} type="password" {...input} />
      </div>
    );
  };

  onSubmit = ({ email, password }) => {
    this.props.signInWithEmailAndPassword(email, password);
  };

  render() {
    return (
      <div className="sign-in-page">
        <div className="main-buttons">
          <div className="main-button">
            <img className="main-button__img" src="./images/R.Mend-logo-orange.png" alt="LOGIN" />
          </div>
        </div>
        <div className="sign-in-container">
          <div className="form-header">
            <h2>Sign In</h2>
          </div>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="sign-in-form">
            <Field name="email" component={this.renderEmailInput} label="Email" />
            <Field name="password" component={this.renderPasswordInput} label="Password" />
            <div className="form-row">
              <button>Enter</button>
            </div>
          </form>
          <GoogleSignInButton />
          <div className="sign-in-registure">
            <p>Don't have an account?</p>
            <Link to="/registure">Registure here</Link>
          </div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Email is required';
  }
  if (!formValues.password) {
    errors.password = 'Password is reqired';
  }

  return errors;
};

const wrappedComponent = reduxForm({
  form: 'signInForm',
  validate
})(SignInPage);

export default connect(
  null,
  { signInWithEmailAndPassword }
)(wrappedComponent);
