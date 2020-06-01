import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createActivity } from "../../actions/activityActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { activityData } from "./activityCatalogue.json";

class AddActivity extends Component {
  constructor() {
    super();
    this.state = {
      activityType: "",
      title: "",
      date: "",
      startTime: "",
      description: "",
      activitySubtype: "",
      terrain: "",
      hours: "",
      minutes: "",
      seconds: "",
      distance: "",
      averageHeartRate: "",
      calories: "",
      steps: "",
      averagePace: "",
      averageSpeed: "",
      power: "",
      cadence: "",
      elevationLoss: "",
      elevationGain: "",
      lapLength: "",
      laps: "",
      gender: "",
      weight: "",
      age: "",
      activitySubtypes: [],
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newActivity = {
      activityType: this.state.activityType,
      title: this.state.title,
      date: this.state.date,
      startTime: this.state.startTime,
      description: this.state.description,
      activitySubtype: this.state.activitySubtype,
      terrain: this.state.terrain,
      hours: this.state.hours,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      distance: this.state.distance,
      averageHeartRate: this.state.averageHeartRate,
      calories: this.state.calories,
      steps: this.state.steps,
      averagePace: this.state.averagePace,
      averageSpeed: this.state.averageSpeed,
      power: this.state.power,
      cadence: this.state.cadence,
      elevationLoss: this.state.elevationLoss,
      elevationGain: this.state.elevationGain,
      lapLength: this.state.lapLength,
      laps: this.state.laps
    };
    this.props.createActivity(newActivity, this.props.history);
  }

  componentDidMount() {
    const { gender } = this.props.person;
    const { weight } = this.props.person;
    const { age } = this.props.person;

    this.setState({ gender: gender });
    this.setState({ weight: weight });
    this.setState({ age: age });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onActivityTypeChange(e) {
    let activityType = e.target.value;
    let activitySubtypes = activityData.filter(
      x => x.activityType === activityType
    )[0].activitySubtype;

    this.setState({ activityType: activityType });
    this.setState({ activitySubtypes: activitySubtypes });
  }

  onDistanceChange(e) {
    let distance = e.target.value;
    const stepsCalculation = distance * 1243;

    let averagePace;
    let averageSpeed;

    let { totalDurationInMinutes } = this.getTotalDurationInMinutes();
    let { totalDurationInHours } = this.getTotalDurationInHours();

    averagePace = totalDurationInMinutes / distance;
    averageSpeed = distance / totalDurationInHours;

    this.setState({ distance: distance });
    this.setState({ steps: stepsCalculation });
    this.setState({ averagePace: averagePace.toFixed(2) });
    this.setState({ averageSpeed: averageSpeed.toFixed(2) });
  }

  onHeartRateChange(e) {
    let heartRate = e.target.value;
    let gender = this.state.gender;
    let weight = this.state.weight;
    let age = this.state.age;
    let calories;
    let { totalDurationInHours } = this.getTotalDurationInHours();

    if (gender === "MALE") {
      calories =
        ((-55.0969 +
          0.6309 * parseInt(heartRate) +
          0.1988 * parseFloat(weight) +
          0.2017 * parseInt(age)) /
          4.184) *
        60 *
        parseFloat(totalDurationInHours);
    } else if (gender === "FEMALE") {
      calories =
        ((-20.4022 +
          0.4472 * parseInt(heartRate) -
          0.1263 * parseFloat(weight) +
          0.074 * parseInt(age)) /
          4.184) *
        60 *
        parseFloat(totalDurationInHours);
    }

    this.setState({ averageHeartRate: heartRate });
    this.setState({ calories: calories.toFixed(0) });
  }

      // Convert duration to minutes
      getTotalDurationInMinutes() {
    let hoursToMinutes;
    let secondsToMinutes;
    let totalDurationInMinutes;
    let hours = this.state.hours;
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;

    if (hours !== 0) {
      hoursToMinutes = hours * 60;
    }
    if (seconds !== 0) {
      secondsToMinutes = seconds / 60;
    }
    totalDurationInMinutes =
      parseFloat(hoursToMinutes) +
      parseFloat(minutes) +
      parseFloat(secondsToMinutes);
    return { totalDurationInMinutes };
  }

      // Convert duration to hours
      getTotalDurationInHours() {
    let totalDurationInHours;
    let minutesToHours;
    let secondsToHours;
    let hours = this.state.hours;
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;

    if (minutes !== 0) {
      minutesToHours = minutes / 60;
    }
    if (seconds !== 0) {
      secondsToHours = seconds / 3600;
    }
    totalDurationInHours =
      parseFloat(hours) +
      parseFloat(minutesToHours) +
      parseFloat(secondsToHours);
    return { totalDurationInHours };
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-activity">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <h6 className="display-4 text-center">Log a new activity</h6>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <h6>Activity type</h6>
                    <select
                      id="activityType"
                      multiple={false}
                      className="form-control"
                      name="activityType"
                      value={this.state.activityType}
                      onChange={this.onActivityTypeChange.bind(this)}
                    >
                      <option>Select an activity type</option>
                      {activityData.map(data => (
                        <option
                          value={data.activityType}
                          key={data.activityType}
                        >
                          {data.activityType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <h6>Date *</h6>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <span className="input-group-addon">
                            <i className="fa fa-calendar" />
                          </span>
                        </div>
                      </div>
                      <input
                        type="date"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.date
                        })}
                        name="date"
                        value={this.state.date}
                        onChange={this.onChange}
                      />
                      {errors.date && (
                        <div className="invalid-feedback">{errors.date}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <h6>Start Time</h6>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <span className="input-group-addon">
                            <i className="fa fa-clock" />
                          </span>
                        </div>
                      </div>
                      <input
                        type="time"
                        className="form-control form-control-lg"
                        name="startTime"
                        value={this.state.startTime}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <h6>Title *</h6>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.title
                    })}
                    placeholder="Activity Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <h6>Description</h6>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="How did it go? How did you feel? How was the weather?"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <hr />
                <h6>Activity subtype</h6>
                <div className="form-group">
                  <select
                    id="activitySubtype"
                    multiple={false}
                    className="form-control col-md-3"
                    name="activitySubtype"
                    value={this.state.activitySubtype}
                    onChange={this.onChange}
                  >
                    <option>Select an activity subtype</option>
                    {this.state.activitySubtypes.map(data => (
                      <option value={data} key={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                </div>
                <h6>Terrain</h6>
                <div className="form-group">
                  <select
                    id="terrain"
                    multiple={false}
                    className="form-control col-md-3"
                    name="terrain"
                    value={this.state.terrain}
                    onChange={this.onChange}
                  >
                    <option>Select a terrain</option>
                    <option>Flat</option>
                    <option>Light hills</option>
                    <option>Moderate hills</option>
                    <option>Mountains</option>
                    <option>Track</option>
                  </select>
                </div>
                <h6>Duration</h6>
                <div className="input-group">
                  <input
                    type="numeric"
                    min="0"
                    max="98"
                    step="1"
                    className="form-control form-control-lg col-md-1"
                    placeholder="hh"
                    name="hours"
                    value={this.state.hours}
                    onChange={this.onChange}
                  />
                  <input
                    type="numeric"
                    min="0"
                    max="59"
                    step="1"
                    className="form-control form-control-lg col-md-1"
                    placeholder="mm"
                    name="minutes"
                    value={this.state.minutes}
                    onChange={this.onChange}
                  />
                  <input
                    type="numeric"
                    min="0"
                    max="59"
                    step="1"
                    className="form-control form-control-lg col-md-1"
                    placeholder="ss"
                    name="seconds"
                    value={this.state.seconds}
                    onChange={this.onChange}
                  />
                </div>
                &nbsp;
                <h6>Distance</h6>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="numeric"
                      min="0"
                      className="form-control form-control-lg col-md-3"
                      placeholder="Distance"
                      name="distance"
                      value={this.state.distance}
                      onChange={this.onDistanceChange.bind(this)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">km</div>
                    </div>
                  </div>
                </div>
                <h6>Average heart rate</h6>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="numeric"
                      min="0"
                      step="1"
                      className="form-control form-control-lg col-md-3"
                      placeholder="Average heart rate"
                      name="averageHeartRate"
                      value={this.state.averageHeartRate}
                      onChange={this.onHeartRateChange.bind(this)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">bpm</div>
                    </div>
                  </div>
                </div>
                <h6>Calories</h6>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="numeric"
                      min="0"
                      step="1"
                      className="form-control form-control-lg col-md-3"
                      placeholder="Calories"
                      name="calories"
                      value={this.state.calories}
                      onChange={this.onChange}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">kcal</div>
                    </div>
                  </div>
                </div>
                <h6>Steps</h6>
                <div className="form-group">
                  <input
                    type="numeric"
                    min="0"
                    step="1"
                    className="form-control form-control-lg col-md-3"
                    placeholder="Steps"
                    name="steps"
                    value={this.state.steps}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-row">
                  &nbsp;
                  <div className="form-group">
                    <h6>Average pace</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        className="form-control form-control-lg col-md-10"
                        placeholder="Average pace"
                        name="averagePace"
                        value={this.state.averagePace}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">min/km</div>
                      </div>
                    </div>
                  </div>
                  &nbsp; &nbsp;
                  <div className="form-group">
                    <h6>Average speed</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        className="form-control form-control-lg  col-md-10"
                        placeholder="Average speed"
                        name="averageSpeed"
                        value={this.state.averageSpeed}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">km/h</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <h6>Power</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        step="1"
                        className="form-control form-control-lg  col-md-10"
                        placeholder="Power"
                        name="power"
                        value={this.state.power}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">w</div>
                      </div>
                    </div>
                  </div>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <div className="form-group">
                    <h6>Cadence</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        step="1"
                        className="form-control form-control-lg  col-md-10"
                        placeholder="Cadence"
                        name="cadence"
                        value={this.state.cadence}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">rpm</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <h6>Elevation loss</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        step="1"
                        className="form-control form-control-lg  col-md-10"
                        placeholder="Elevation loss"
                        name="elevationLoss"
                        value={this.state.elevationLoss}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">m</div>
                      </div>
                    </div>
                  </div>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <div className="form-group">
                    <h6>Elevation gain</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        step="1"
                        className="form-control form-control-lg  col-md-10"
                        placeholder="Elevation gain"
                        name="elevationGain"
                        value={this.state.elevationGain}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">m</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <h6>Lap length</h6>
                    <div className="input-group">
                      <input
                        type="numeric"
                        min="0"
                        step="1"
                        className="form-control form-control-lg col-md-10"
                        placeholder="Lap length"
                        name="lapLength"
                        value={this.state.lapLength}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">m</div>
                      </div>
                    </div>
                  </div>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <div className="form-group">
                    <h6>Laps</h6>
                    <input
                      type="numeric"
                      min="0"
                      step="1"
                      className="form-control form-control-lg col-md-10"
                      placeholder="Laps"
                      name="laps"
                      value={this.state.laps}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <hr />
                <button type="submit" className="btn btn-primary btn-lg">
                  Create
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Link className="card-link" to="/dashboard">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddActivity.propTypes = {
  person: PropTypes.object.isRequired,
  createActivity: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security.person,
  person: state.person.person,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createActivity }
)(AddActivity);
