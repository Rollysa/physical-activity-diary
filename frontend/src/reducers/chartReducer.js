import {
    GET_TOTAL_MONTHLY_DISTANCE,
    GET_TOTAL_MONTHLY_CALORIES,
    GET_TOTAL_MONTHLY_STEPS
  } from "../actions/types";
  
  const initialState = {
    distanceData: {},
    caloriesData: {},
    stepsData: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_TOTAL_MONTHLY_DISTANCE:
        return {
          ...state,
          distanceData: {
            labels: action.payload.labels,
            datasets: [
              {
                label: "Total distance [km]",
                data: action.payload.data,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBorderColor: "rgba(75,192,192,1)",
                hoverBackgroundColor: "#fff",
                hoverBorderWidth: 1
              }
            ]
          }
        };
      case GET_TOTAL_MONTHLY_CALORIES:
        return {
          ...state,
          caloriesData: {
            labels: action.payload.labels,
            datasets: [
              {
                label: "Total calories [kcal]",
                data: action.payload.data,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(83,189,255,0.4)",
                borderColor: "rgba(83,189,255,1)",
                borderWidth: 1,
                hoverBorderColor: "rgba(83,189,255,1)",
                hoverBackgroundColor: "#fff",
                hoverBorderWidth: 1
              }
            ]
          }
        };
      case GET_TOTAL_MONTHLY_STEPS:
        return {
          ...state,
          stepsData: {
            labels: action.payload.labels,
            datasets: [
              {
                label: "Total steps",
                data: action.payload.data,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255, 196, 79, 0.5)",
                borderColor: "rgba(255, 196, 79, 1)",
                borderWidth: 1,
                hoverBorderColor: "rgba(255, 196, 79, 1)",
                hoverBackgroundColor: "#fff",
                hoverBorderWidth: 1
              }
            ]
          }
        };
      default:
        return state;
    }
  }
  