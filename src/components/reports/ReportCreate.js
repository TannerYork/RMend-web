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

  clearInputs = () => {
    this.setState({
      photos: [],
      roadName: '',
      details: '',
      magisterialDistrict: '',
      nearestStreet: '',
      priority: false
    })
  }

  handlePhotosChange = async e => {
    const imageDisplay = document.querySelector('.form-image-display')
    const files = Array.from(e.target.files);

    if (files.length <= 2) {
      while (imageDisplay.firstChild) {
        imageDisplay.removeChild(imageDisplay.firstChild);
      }

      files.forEach(async (file) => {
        await loadImage( file,(img) => {
          imageDisplay.appendChild(img);
          if (img.toBlob) {
            img.toBlob((blob) => {
              this.setState({photos: [...this.state.photos, blob]})
            })
          } else {
            console.error('Could not find .toBlob')
          }
        },
        { orientation: true, maxWidth: 300, maxHeight: 450 });
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

  handleSubmit =  e => {
    console.log('Creating Report')
    e.preventDefault();
    const { state } = this;
    const errors = this.validate(state);
    if (!errors.keys) {
      this.props.createReport(state)
      this.clearInputs()
      return;
    } else {
      console.log(errors)
    }
    console.log('Finnished')
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
            <select onChange={this.handleDistrictChange} required>
              <option value={false}>not selected</option>
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
            <select onChange={this.handlePriorityChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
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