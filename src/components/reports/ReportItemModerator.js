import React from 'react';
import './ReportItem.css';

class ReportItemModerator extends React.Component {
  state = { shouldShowReviewPage: false };

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
        <div class="report-item_actions">
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
        </div>
      </div>
    );
  }
}

export default ReportItemModerator;
