import React from 'react';
import { connect } from 'react-redux';

import { createReport } from '../../actions';
import './Form.css';

class ReportCreate extends React.Component {
  state = {
    photos: [],
    roadName: '',
    details: '',
    magisterialDistrict: '',
    nearestStreet: '',
    priority: false
  };

  validate = formValues => {
    const errors = {};
    if (formValues.photos < 1) errors.photo = 'At least one photo of the issue is required';
    if (!formValues.roadName) errors.roadName = "The road's name is required";
    if (!formValues.details) errors.roadName = 'Details of the issue is required';
    if (!formValues.magisterialDistrict) errors.district = 'The magisterial district is required';
    return errors;
  };

  handlePhotosChange = e => this.setState({ files: e.target.files });

  handleRoadNameChange = e => this.setState({ roadName: e.target.value });

  handleDetailsChange = e => this.setState({ details: e.target.value });

  handleDistrictChange = e => this.setState({ magsiterialDistrict: e.target.value });

  handleStreetChange = e => this.setState({ nearestStreet: e.target.value });

  handlePriorityChange = e => this.setState({ priority: e.tartget.value });

  handleSubmit = e => {
    e.preventDefault();
    const { state, createReport } = this;

    const errors = this.validate(state);
    if (errors.keys().length < 1) {
      console.log(errors);
      return;
    }
  };

  render() {
    const { input } = this;
    return (
      <div class="report-create sub-container disable-scrollbars">
        <header className="form-header">
          <h1>Report a Problem</h1>
          <p>
            <em>If this is an emergency please call 911</em>
          </p>
        </header>
        <form className="issue-form js-issue-form" onSubmit={this.handleSubmit}>
          <div className="js-form-img-display" />

          <div className="form-row form-row-photo">
            <label>
              <span>Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={this.handlePhotosChange}
                files={this.state.files}
              />
            </label>
          </div>

          <div className="form-row">
            <label>Road Name</label>
            <input
              type="text"
              placeholder="Required"
              value={this.state.roadName}
              onChange={this.handleRoadNameChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <input
              type="text"
              placeholder="Required"
              value={this.state.details}
              onChange={this.handleDetailsChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Magisterial District</label>
            <input
              type="text"
              placeholder="Required"
              value={this.state.magisterialDistrict}
              onChange={this.handleDistrictChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Nearest Street Address</label>
            <input
              type="text"
              value={this.state.nearestStreet}
              onChange={this.handleStreetChange}
            />
          </div>

          <fieldset className="legacy-form-row radio" required>
            <legend>Is this a high priority?</legend>
            <input
              type="radio"
              value={true}
              onChange={this.handlePriorityChange}
              checked={this.state.priority ? true : false}
            />
            <label className="radio-label">Yes</label>
            <input type="radio" value={false} checked={this.state.priority ? false : true} />
            <label className="radio-label">No</label>
          </fieldset>

          <div className="form-row">
            <button className="form-submit js-issue-submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { createReport }
)(ReportCreate);
