import React from 'react';
import { connect } from 'react-redux';

import ReportCard from '../components/ReportCard';
import './HomePage.css';

class HomePage extends React.Component {
  state = { reports: [], employees: [], blacklist: [] };

  componentDidMount() {
    this._getReportsAsync();
  }

  _getReportsAsync = async () => {};

  _getEmployeesAsync = async () => {};

  renderReportsList = () => {
    return (
      <li id="reports-list">
        {this.state.reports.map((report) => {
          return <ReportCard report={report} />;
        })}
      </li>
    );
  };

  renderEmployeesList = () => {
    return <li styles={styles.employeesList}></li>;
  };

  renderBlacklist = () => {
    return <li styles={styles.blacklist}></li>;
  };

  render = () => {
    return (
      <div class="content">
        {this.renderReportsList()}
        {this.renderEmployeesList()}
        {this.renderBlacklist()}
      </div>
    );
  };
}

const styles = {
  reportList: {},
  employeesList: {},
  blacklist: {},
};
