import React from 'react';
import './ReportPage.css';

class ReportPage extends React.Component{
    renderPhotos = () => {
        const { data } = this.props
        return data.photos.map((photo) => {
            return <img src={photo.imageUrl} alt={data.details} />
        });
    }

    render() {
        const { data } = this.props
        return (
           <div>
                <div className="report-photos">
                    {this.renderPhotos()}
                </div>
                <div className="form-header report-header">
                    <h1>{data.sender}</h1>
                </div>
                <div className="report-details">
                    <p>Details: {data.details}</p>
                    <p>Under Review: {data.isBeingReviewd}</p>
                    <p>District: {data.magisterialDiscrict}</p>
                    <p>Nearest Street: {data.nearestStreet}</p>
                    <p>Road Name: {data.roadName}</p>
                    <p>Date: {data.timestamp}</p>
                </div>
           </div>
        );
    }
}

export default ReportPage