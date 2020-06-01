import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import {
  getTotalMonthlyDistance,
  getTotalMonthlyCalories,
  getTotalMonthlySteps
} from "../../actions/chartActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Chart extends Component {
  componentDidMount() {
    this.props.getTotalMonthlyDistance();
    this.props.getTotalMonthlyCalories();
    this.props.getTotalMonthlySteps();
  }

  render() {
    const distanceData = {
      labels: this.props.distance.labels,
      datasets: this.props.distance.datasets
    };   

    const caloriesData = {
      labels: this.props.calories.labels,
      datasets: this.props.calories.datasets
    }; 

    const stepsData = {
      labels: this.props.steps.labels,
      datasets: this.props.steps.datasets
    }; 

    return (
      <div className="charts">
        <div className="container">
          <h4>Your analysis for the last month</h4>
          <Bar ref="distanceChart" data={distanceData} />
          <Bar ref="caloriesChart" data={caloriesData} />
          <Bar ref="stepsChart" data={stepsData} />
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  distance: PropTypes.object.isRequired,
  calories: PropTypes.object.isRequired,
  steps: PropTypes.object.isRequired,
  getTotalMonthlyDistance: PropTypes.func.isRequired,
  getTotalMonthlyCalories: PropTypes.func.isRequired,
  getTotalMonthlySteps: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  distance: state.chart.distanceData, 
  calories: state.chart.caloriesData,
  steps: state.chart.stepsData,
});
export default connect(
  mapStateToProps,
  { getTotalMonthlyDistance, getTotalMonthlyCalories, getTotalMonthlySteps }
)(Chart);
