import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteActivity } from "../../actions/activityActions";

class Activity extends Component {
  onDeleteClick = id => {
    this.props.deleteActivity(id);
  };

  render() {
    const { activity } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-2">
              <h6>{activity.date}</h6>
            </div>
            <div className="col-2">
              <span className="mx-0">{activity.title} </span>
            </div>
            <div className="col-1">
              <span className="mx-0">{activity.distance} km</span>
            </div>
            <div className="col-2">
              <span className="mx-0">{activity.calories} kcal</span>
            </div>
            <div className="col-2">
              <span className="mx-0">{activity.averageHeartRate} bpm</span>
            </div>
            <div className="col-md-3 d-block ml-auto">
              <ul className="list-group list-group-horizontal">
                <Link to={`/updateActivity/${activity.id}`}>
                  <li className="list-group-item list-group-item-info update">
                    <i className="fa fa-edit pr-1"> Update</i>
                  </li>
                </Link>
                <li
                  className="list-group-item list-group-item-danger delete"
                  onClick={this.onDeleteClick.bind(this, activity.id)}
                >
                  <i className="fa fa-trash"> Delete</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  deleteActivity: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteActivity }
)(Activity);
