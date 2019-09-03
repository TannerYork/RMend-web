import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createUserWithEmailPasswordAndUserName } from '../../actions';
import GoogleAuthButton from '../firebase/GoogleSignInButton';
import './RegisturePage.css';

class RegisturePage extends React.Component {
  renderError = ({ touched, error }) => {
    return touched && error ? error : '';
  };

  renderInput = ({ input, label, type, meta }) => {
    return (
      <div className="form-row">
        <label>{label}</label>
        <input placeholder={this.renderError(meta)} type={type} {...input} />
      </div>
    );
  };

  onSubmit = ({ email, password, userName }) => {
    this.props.createUserWithEmailPasswordAndUserName(email, password, userName);
  };

  render() {
    return (
      <div className="registure-page">
        <div className="main-buttons">
          <div className="main-button">
            <img className="main-button__img" src="./images/R.Mend-logo-orange.png" alt="LOGIN" />
          </div>
        </div>
        <div className="registure-container">
          <div className="form-header">
            <h2>Create Account</h2>
          </div>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="sign-in-form">
            <Field name="userName" component={this.renderInput} label="User Name" type="text" />
            <Field name="email" component={this.renderInput} label="Email" type="text" />
            <Field name="password" component={this.renderInput} label="Password" type="password" />
            <Field
              name="confirmPassword"
              component={this.renderInput}
              label="Confirm Password"
              type="password"
            />
            <div className="form-row">
              <button>Enter</button>
            </div>
          </form>
          <GoogleAuthButton />
          <div className="registure-return">
            <p>
              Need to go <Link to="/">Back?</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) errors.email = 'Email is required';
  if (!formValues.userName) errors.userName = 'User Name is required';
  if (!formValues.password) errors.password = 'Password is reqired';
  if (!formValues.confirmPassword || formValues.confirmPassword !== formValues.password)
    errors.confirmPassword = 'Does not match password';

  return errors;
};

const wrappedComponent = reduxForm({
  form: 'signInForm',
  validate
})(RegisturePage);

export default connect(
  null,
  { createUserWithEmailPasswordAndUserName }
)(wrappedComponent);
