import React from 'react';
import './ReportItem.css';

const StaffReportItem = props => {
  const { data } = props;
  return (
    <div class="report-item js-report-item" id={data.id} data-id={data.id}>
      <figure class="report-item__figure">
        <img
          class="report-item__img"
          src={data.imageUrl || '../../images/Spin-1s-80px.svg'}
          alt={data.details}
        />
      </figure>
      <div class="report-item__data disable-scrollbars">
        <h4>
          <span class="report-item__subheader">Sender: </span>
          {data.sender}
        </h4>
        <p>
          <span class="report-item__subheader">Date: </span>
          {data.timestamp}
        </p>
        <p>
          <span class="report-item__subheader">Road Name: </span>
          {data.roadName}
        </p>
        <p>
          <span class="report-item__subheader">Description: </span>
          {data.details}
        </p>
        <p>
          <span class="report-item__subheader">Nearest Street: </span>
          {data.nearestStreet}
        </p>
        <p>
          <span class="report-item__subheader">Magisterial District: </span>
          {data.magisterialDistrict}
        </p>
      </div>
      <label
        class="report-item__button-underReview .js-report-item-underReview"
        title="put report under review"
      >
        <input type="checkbox" class="checkbox js-review" checked={data.isBeingReviewed} disabled />
        <span class="checkmark" />
      </label>
    </div>
  );
};

export default StaffReportItem;
