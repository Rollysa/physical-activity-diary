import axios from "axios";
import {
  GET_TOTAL_MONTHLY_DISTANCE,
  GET_TOTAL_MONTHLY_CALORIES,
  GET_TOTAL_MONTHLY_STEPS
} from "./types";

export const getTotalMonthlyDistance = () => async dispatch => {
  const res = await axios.get(`/api/chart/distance`);
  dispatch({
    type: GET_TOTAL_MONTHLY_DISTANCE,
    payload: {
    labels: Object.keys(res.data),
    data: Object.values(res.data)
    }
  });
};

export const getTotalMonthlyCalories = () => async dispatch => {
  const res = await axios.get(`/api/chart/calories`);
  dispatch({
    type: GET_TOTAL_MONTHLY_CALORIES,
    payload: {
      labels: Object.keys(res.data),
      data: Object.values(res.data)
    }
  });
};

export const getTotalMonthlySteps = () => async dispatch => {
  const res = await axios.get(`/api/chart/steps`);
  dispatch({
    type: GET_TOTAL_MONTHLY_STEPS,
    payload: {
      labels: Object.keys(res.data),
      data: Object.values(res.data)
    }
  });
};
