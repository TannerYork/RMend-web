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
            src={data.photos[0].imageUrl || '../../images/Spin-1s-80px.svg'}
            alt={data.details}
          />
        </figure>
        <div className="report-item__preview">
        <div className="report-item__details">
          <h3>{data.sender}</h3>
          <h4>{data.roadName}</h4>
        </div>
        <button className="report-item__button">More</button>
        </div>
      </div>
    );
  }
}

export default ReportItemModerator;
