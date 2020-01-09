import React from 'react';
import { connect } from 'react-redux';

import { updateUserInfo } from '../../actions/index';

class UserPage extends React.PureComponent {
  state = { verification: this.props.data.verification, district: this.props.data.magisterialDistrict }

  handleVerificationChange = e => {this.setState({ verification: e.target.value })};
  handleDistrictChange = e => {this.setState({district: e.target.value})};

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.updateUserInfo(this.props.data.id, this.state.verification, this.state.district);
    this.props.returnToUsersList();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="user-page">
        <header className="form-header">
          <h1>{data.displayName}</h1>
          <p>
            <em>{data.email}</em>
          </p>
        </header>
        <form className="user-info-form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label htmlFor="user-verification-status">Verification Status</label>
            <select onChange={this.handleVerificationChange}>
              <option value="moderator">Moderator</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
          <div className="form-row">
            <label>Magisterial District</label>
            <select onChange={this.handleDistrictChange}>
              <option value="" defaultValue={data.magisterialDistrict === '' ? 'selected' : ''}>
                No Disctrict
              </option>
              <option value="manager" defaultValue={data.magisterialDistrict === 'manager' ? 'selected' : ''}>
                Manager
              </option>
              <option value="1" defaultValue={data.magisterialDistrict === '1' ? 'selected' : ''}>
                1
              </option>
              <option value="2" defaultValue={data.magisterialDistrict === '2' ? 'selected' : ''}>
                2
              </option>
              <option value="3" defaultValue={data.magisterialDistrict === '3' ? 'selected' : ''}>
                3
              </option>
              <option value="4" defaultValue={data.magisterialDistrict === '4' ? 'selected' : ''}>
                4
              </option>
              <option value="5" defaultValue={data.magisterialDistrict === '5' ? 'selected' : ''}>
                5
              </option>
              <option value="6" defaultValue={data.magisterialDistrict === '6' ? 'selected' : ''}>
                6
              </option>
              <option value="7" defaultValue={data.magisterialDistrict === '7' ? 'selected' : ''}>
                7
              </option>
            </select>
          </div>
          <div className="form-row">
            <button className="form-submit">Save</button>
          </div>
          <div className="form-row">
            <button type='button' className="user-form-cancel" onClick={() => this.props.returnToUsersList()}>Cancel</button>
        </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { updateUserInfo })(UserPage);
