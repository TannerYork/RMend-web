import React from 'react';

import DetailsCard from '../reports/DetailsCard';
import './ReportPage.css';

class ReportPage extends React.Component {
  state = {
    checkboxes: {
      'prioritize': this.props.data.priority, 
      'putUnderReview': this.props.data.isBeingReviewed
    }
  }
  
  renderPhotos = () => {
    const { data } = this.props;
    return data.photos.map(photo => {
      return <img src={photo.imageUrl} alt={data.details} />;
    });
  };

  renderPrintPage = () => {
    const {data} = this.props
    return (
      <iframe id="ifmcontentstoprint" style={{height: 0, width: 0, position: 'absolute'}}>
          <div className="report-page" id="report-print">
            <div className="report-photos">{
              data.photos.map(photo => {
                return <img src={photo.imageUrl} alt={data.details} />;
              }) 
            }</div>
            <div className="report-details">
              <div>
                <h4>Sender: </h4><p>{data.sender}</p>
              </div>
              <div>
                <h4>Details: </h4><p>{data.details}</p>
              </div>
              <div>
                <h4>District: </h4><p>{data.magisterialDistrict}</p>
              </div>
              <div>
                <h4>Nearst Street: </h4><p>{data.nearstStreet}</p>
              </div>
            </div>
          </div>
      </iframe>
    )
  }

  confirmCheckboxChange = (checkboxName) => {
    if (checkboxName == 'putUnderReview') {
      return window.confirm('Are you sure you want to put this under review? This will send a notification to magistrates in the reports district.')
    } else if (checkboxName == 'prioritize') {
      return true
    }
  }

  handleCheckboxChange = (name) => {
    if (this.state.checkboxes[name] != true) {
      const result = this.confirmCheckboxChange(name)
      if (result == true) {
        this.setState((prevState, prevProps) => ({
          checkboxes: {
            ...prevState.checkboxes,
            [name]: true
          }
        }));
      } else if (this.state.checkboxes[name] != true) {
        this.setState((prevState, prevProps) => ({
          checkboxes: {
            ...prevState.checkboxes,
            [name]: false
          }
        }));
      }
    }
  };

  handlePrintClick = () => {
    // TODO: Fix the issue of images not showing after first click
    var content = document.getElementById("report-print");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  handleDeleteClick = () => {
    
  }

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
          <button className="report-button report-button__print" onClick={this.handlePrintClick}></button>
          <label className="report-button report-button__prioritize" title="Prioritize">
            <input
              type="checkbox"
              checked ={this.state.checkboxes['prioritize']}
              onChange={() => this.handleCheckboxChange('prioritize')}
              className="checkbox"
            />
            <span className="checkmark"></span>
          </label>
          <label className="report-button report-button__under-review" title="Put Under Review">
            <input
              type="checkbox"
              checked ={this.state.checkboxes['putUnderReview']}
              onChange={() => this.handleCheckboxChange('putUnderReview')}
              className="checkbox"
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="center-items">
          <button className="report-button report-button__delete" onClick={this.handleDeleteClick}>Delete</button>
          <button className="report-button report-button__return" onClick={this.props.returnToReportsList}>Return</button>
        </div>
        {this.renderPrintPage()}
      </div>
    );
  }
}

export default ReportPage;
