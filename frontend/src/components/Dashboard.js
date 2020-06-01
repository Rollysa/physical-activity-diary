import React, { Component } from "react";
import Activity from "./activity/Activity";
import CreateActivityButton from "./activity/CreateActivityButton";
import { connect } from "react-redux";
import { getActivities } from "../actions/activityActions";
import { getPerson } from "../actions/personActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getActivities();
    const { id } = this.props.security;
    this.props.getPerson(id, this.props.history);
  }

  render() {
    const { activities } = this.props.activity;

    let activityHistory;

    const generateActivityHistory = activities => {
      if (activities.length < 1) {
        return (
          <div className="alert alert-info text-center" role="alert">
            No activity log on this dashboard
          </div>
        );
      }

      return activities.map(activity => (
        <Activity key={activity.id} activity={activity} />
      ));
    };

    activityHistory = generateActivityHistory(activities);

    return (
      <div className="activities">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Activity History</h1>
              <br />
              <CreateActivityButton />
              <br />
              <hr />
              {activityHistory}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  activity: PropTypes.object.isRequired,
  getActivities: PropTypes.func.isRequired,
  getPerson: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activity: state.activity,
  security: state.security.person
});

export default connect(
  mapStateToProps,
  { getActivities, getPerson }
)(Dashboard);
