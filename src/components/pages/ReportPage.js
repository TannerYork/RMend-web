import React from 'react';

import DetailsCard from '../reports/DetailsCard';
import './ReportPage.css';

class ReportPage extends React.Component {
  renderPhotos = () => {
    const { data } = this.props;
    return data.photos.map(photo => {
      return <img src={photo.imageUrl} alt={data.details} />;
    });
  };

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  render() {
    const { data } = this.props;
    return (
      <div className="report-page">
        <div className="report-photos">{this.renderPhotos()}</div>
        <div className="report-details">
          <DetailsCard label="Sender">
            <h4>{data.sender}</h4>
          </DetailsCard>
          <DetailsCard label="Detials">
            <h4>{data.details}</h4>
          </DetailsCard>
          <DetailsCard label="District">
            <h4>{data.magisterialDistrict}</h4>
          </DetailsCard>
          <DetailsCard label="Nearest Street">
            <h4>{data.nearstStreet}</h4>
          </DetailsCard>
        </div>
        <div className="report-buttons">
          <button className="report-button report-button__print"></button>
          <label className="report-button report-button__prioritize" title="Prioritize">
            <input
              type="checkbox"
              // onChange={this.handleCheckboxChange}
              className="checkbox"
            />
            <span className="checkmark"></span>
          </label>
          <label className="report-button report-button__under-review" title="Prioritize">
            <input
              type="checkbox"
              // onChange={this.handleCheckboxChange}
              className="checkbox"
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="center-items">
          <button className="report-button report-button__delete">Delete</button>
          <button className="report-button report-button__return">Return</button>
        </div>
      </div>
    );
  }
}

export default ReportPage;
