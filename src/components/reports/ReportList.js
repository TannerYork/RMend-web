import React from 'react';
import { connect } from 'react-redux';

import { fetchReports } from '../../actions';
import { firestore } from '../../config/firebase';
import ReportItemModerator from './ReportItemModerator';
import ReportItemStaff from './ReportItemStaff';
import ReportPage from '../pages/ReportPage';
import './ReportList.css';

class ReportList extends React.Component {
  state = { lisenter: null, reports: null, selectedReport: null };

  componentDidMount() {
    var lisenter = firestore.collection('reports').onSnapshot(snapShot => {
      const reports = [];
      snapShot.forEach(report => reports.push(report.data()));
      this.setState({ reports })
    });
    this.setState({ lisenter });
  }

  componentWillUnmount() {
    this.state.lisenter();
  }

  selectReport = (data) => {
    this.setState({selectedReport: data})
  }

  returnToReportsList = () => {
    this.setState({selectedReport: null})
  }

  renderReports() {
    const { user } = this.props;
    const reports = this.state.reports;
    if (reports && user && reports.length > 0 && user.magisterialDistrict === 'admin') {
      return reports.map(report => { 
        return <ReportItemModerator data={report} selectReport={this.selectReport}/>;
      });
    } else if (reports && user && reports.length > 0) {
       return reports.map(report => {
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

  renderReportsOrReport = () => {
    if (this.state.selectedReport) {
      return <ReportPage data={this.state.selectedReport} returnToReportsList={this.returnToReportsList}/>
    } else {
      return <div className="reports-list disable-scrollbars">{this.renderReports()}</div>
    }
  }

  render() {
    return (
      <div className="sub-container disable-scrollbars">
        {this.renderReportsOrReport()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
};

export default connect(
  mapStateToProps,
  { fetchReports }
)(ReportList);
