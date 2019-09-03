import React from 'react';
import { connect } from 'react-redux';

import { fetchReports } from '../../actions';
import { firestore } from '../../config/firebase';
import ReportItemModerator from './ReportItemModerator';
import ReportItemStaff from './ReportItemStaff';
import './ReportList.css';

class ReportList extends React.Component {
  state = { lisenter: null };

  async componentDidMount() {
    var lisenter = await firestore.collection('reports').onSnapshot(snapShot => {
      const reports = [];
      snapShot.forEach(report => reports.push(report.data()));
      this.props.fetchReports(reports);
    });
    this.setState({ lisenter });
  }

  componentWillUnmount() {
    this.state.lisenter();
  }

  renderReports() {
    const { reports, user } = this.props;
    if (reports > 0 && user.magisterialDistrict === 'admin') {
      reports.forEach(report => {
        return <ReportItemModerator data={report} />;
      });
    } else if (reports > 0) {
      reports.forEach(report => {
        return <ReportItemStaff data={report} />;
      });
    } else {
      return (
        <div className="form-header">
          <h1>No Reports Found</h1>
          <p>There are currently no reports submitted.</p>
        </div>
      );
    }
  }

  // {this.renderReports()}

  render() {
    return (
      <div className="sub-container disable-scrollbars">
        <div className="reports-list disable-scrollbars">{this.renderReports()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, auth }) => {
  return {
    reports: firestore.reports,
    user: auth.user
  };
};

export default connect(
  mapStateToProps,
  { fetchReports }
)(ReportList);
