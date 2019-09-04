import * as loadImage from 'blueimp-load-image';
import { connect } from 'react-redux';
import 'blueimp-canvas-to-blob'
import React from 'react';

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
    if (formValues.photos > 2) errors.photo = 'A max of two images is allowed';
    if (!formValues.roadName) errors.roadName = "The road's name is required";
    if (!formValues.details) errors.roadName = 'Details of the issue is required';
    if (!formValues.magisterialDistrict) errors.district = 'The magisterial district is required';
    return errors;
  };

  handlePhotosChange = e => {
    const imageDisplay = document.querySelector('.form-image-display')
    const children = imageDisplay.children
    const canvases = Array.from(children);
    const files = [];
    for (var key in e.target.files) {
      files.push(e.target.files[key])
     }

    if (files.length >= 2) {
      while (imageDisplay.firstChild) {
        imageDisplay.removeChild(imageDisplay.firstChild)
      }

      files.forEach((file) => {
        loadImage( file,(img) => imageDisplay.appendChild(img),
        { orientation: true, maxWidth: 300, maxHeight: 450 });
      })

      canvases.forEach((canvas) => {
        if (canvas.toBlog) {
          const imageBlob = canvas.toBlob()
          this.photos.append(imageBlob)
        }
      })
    } else {
      alert('A max of two images is currently allowed')
    }
  };

  handleRoadNameChange = e => this.setState({ roadName: e.target.value });

  handleDetailsChange = e => this.setState({ details: e.target.value });

  handleDistrictChange = e => this.setState({ magisterialDistrict: e.target.value });

  handleStreetChange = e => this.setState({ nearestStreet: e.target.value });

  handlePriorityChange = e => this.setState({ priority: e.tartget.checked });

  handleSubmit = e => {
    e.preventDefault();
    console.log("Submitting Report")
    const { state, createReport } = this;
    const errors = this.validate(state);
    if (errors.length === 0) {
      createReport(this.state)
      return;
    }
    console.log('FInnished sending report')
  };

  render() {
    return (
      <div className="report-create sub-container disable-scrollbars">
        <header className="form-header">
          <h1>Report a Problem</h1>
          <p>
            <em>If this is an emergency please call 911</em>
          </p>
        </header>
        <form className="issue-form js-issue-form" onSubmit={this.handleSubmit}>
          <div className="form-image-display" />

          <div className="form-row form-row-photo">
            <label>
              <span>Photos </span>
              <input
                type="file"
                accept="image/*"
                multiple
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
            <select required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </div>

          <div className="form-row">
            <label>Nearest Street Address</label>
            <input
              type="text"
              value={this.state.nearestStreet}
              onChange={this.handleStreetChange}
            />
          </div>

          <div className="form-row">
            <label>Is this a priority?</label>
            <select>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* <fieldset className="legacy-form-row radio" onChange={this.handlePriorityChange} required>
            <legend>Is this a high priority?</legend>
            <input
              type="radio"
              value={true}
              checked={this.state.priority ? true : false}
            />
            <label className="radio-label">Yes</label>
            <input
              type="radio"
              value={false}
              checked={this.state.priority ? true : false}
            />
            <label className="radio-label">No</label>
          </fieldset> */}

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
