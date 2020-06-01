import axios from "axios";
import {
  GET_ACTIVITIES,
  GET_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ERRORS
} from "./types";

export const createActivity = (activity, history) => async dispatch => {
  try {
    await axios.post("/api/activity", activity);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updateActivity = (id, activity, history) => async dispatch => {
  try {
    await axios.put(`/api/activity/${id}`, activity);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getActivity = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/activity/${id}`);
    dispatch({
      type: GET_ACTIVITY,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const getActivities = () => async dispatch => {
  const res = await axios.get("/api/activity");
  dispatch({
    type: GET_ACTIVITIES,
    payload: res.data
  });
};

export const deleteActivity = id => async dispatch => {
  if (window.confirm("Do you want to delete this activity?")) {
    await axios.delete(`/api/activity/${id}`);
    dispatch({
      type: DELETE_ACTIVITY,
      payload: id
    });
  }
};
