import React from 'react';
import './ReportItem.css';

const StaffReportItem = props => {
  const { data } = props;
  return (
    <div className="report-item js-report-item" id={data.id} style={{
      border: data.priority ? '5px solid #ff6a30' : 'none'}}>
      <figure className="report-item__figure">
        <img
          className="report-item__img"
          src={data.photos[0].imageUrl || '../../images/Spin-1s-80px.svg'}
          alt={data.details}
        />
      </figure>
      <div className="report-item__preview">
      <div className="report-item__details">
        <h3>{data.roadName}</h3>
        <h4>{data.isBeingReviewed?'Under Review':''}</h4>
      </div>
      <button className="report-item__button">More</button>
      </div>
    </div>
  );
};

export default StaffReportItem;
