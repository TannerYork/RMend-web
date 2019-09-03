import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { sendPasswordRestEmail } from '../../actions';
import './ForgotPasswordPage.css';

class ForgotPasswordPage extends React.Component {
  renderError = ({ touched, error }) => {
    return touched && error ? error : '';
  };

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="form-row">
        <label>{label}</label>
        <input autoComplete="off" placeholder={this.renderError(meta)} type="text" {...input} />
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.sendPasswordRestEmail(formValues.email);
  };

  render() {
    return (
      <div className="forgot-password-page">
        <div className="main-buttons">
          <div className="main-button">
            <img className="main-button__img" src="./images/R.Mend-logo-orange.png" alt="LOGIN" />
          </div>
        </div>
        <div className="forgot-password-container">
          <div className="form-header">
            <h2>Forgot Password?</h2>
          </div>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="forgot-password-form">
            <Field name="email" component={this.renderInput} label="Email" />
            <div className="form-row">
              <button>Enter</button>
            </div>
          </form>
          <div className="forgot-password-return">
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
  return errors;
};

const wrappedComponent = reduxForm({
  form: 'registureForm',
  validate
})(ForgotPasswordPage);

export default connect(
  null,
  { sendPasswordRestEmail }
)(wrappedComponent);
