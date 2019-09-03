import React from 'react';
import './ReportItem.css';

class ReportItemModerator extends React.Component {
  state = { shouldShowReviewPage: false };

  renderReportReviewPage(data) {
    if (this.state.shouldShowReviewPage) {
      return (
        <div className="report-review-page">
          <header className="form-header">
            <h1>{data.id}</h1>
            <p>
              <em>Sent By:{data.sender}</em>
            </p>
          </header>
          <form className="report-review-form" id={`${data.id}-review-form`}>
            <div className="form-row">
              <label htmlFor={`${data.id}-review-message`}>Message:</label>
              <textarea id={`${data.id}-review-message`} name={`${data.id}-review-message`} />
              <div
                id={`${data.id}-magisterial-district"
                ata-magisterialDistrict="${data.magisterialDistrict}`}
              />
            </div>
            <div className="form-row">
              <button className="form-submit">Send</button>
            </div>
          </form>
          <div className="form-row">
            <button className="report-form-cancel" onClick={() => this.setState({shouldShowReviewPage: false})}>Cancel</button>
          </div>
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="report-item js-report-item" id={data.id}>
        <figure className="report-item__figure">
          <img
            className="report-item__img"
            src={data.imageUrl || '../../images/Spin-1s-80px.svg'}
            alt={data.details}
          />
        </figure>
        <div className="report-item__data disable-scrollbars">
          <h4>
            <span className="report-item__subheader">Sender: </span>
            {data.sender}
          </h4>
          <p>
            <span className="report-item__subheader">Date: </span>
            {data.timestamp}
          </p>
          <p>
            <span className="report-item__subheader">Road Name: </span>
            {data.roadName}
          </p>
          <p>
            <span className="report-item__subheader">Description: </span>
            {data.details}
          </p>
          <p>
            <span className="report-item__subheader">Nearest Street: </span>
            {data.nearestStreet}
          </p>
          <p>
            <span className="report-item__subheader">Magisterial District: </span>
            {data.magisterialDistrict}
          </p>
        </div>
        <button
          className="report-item__button report-item__button-delete .js-report-item-delete"
          title="Delete"
        />
        <button
          className="report-item__button report-item__button-print .js-report-item-print"
          title="Print"
        />
        <label
          className="report-item__button-prioritize .js-report-item-prioritize"
          title="Prioritize"
        >
          <input type="checkbox" 
          className="checkbox js-priority" 
          defaultChecked={data.priority} 
          onClick={() => this.setState({ shouldShowReviewPage: !this.state.shouldShowReviewPage})}
          />
          <span className="checkmark" />
        </label>
        <label
          className="report-item__button-underReview .js-report-item-underReview"
          title="put report under review"
        >
          <input
            type="checkbox"
            className="checkbox js-review"
            checked={data.isBeingReviewed}
            disabled={data.isBeingReviewed}
          />
          <span className="checkmark" />
        </label>
        {this.renderReportReviewPage(data)}
      </div>
    );
  }
}

export default ReportItemModerator;
