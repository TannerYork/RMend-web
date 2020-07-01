import React from 'react';
import './DetailsCard.css';

const ReportDetailCard = props => {
  return (
    <div className="detail-card">
      <div className="detail-card__header">
        <h2>{props.label}</h2>
      </div>
      <div className="detail-card__content">{props.children}</div>
    </div>
  );
};

export default ReportDetailCard;
