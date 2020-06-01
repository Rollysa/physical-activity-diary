import axios from "axios";
import { GET_PERSON, GET_ERRORS } from "./types";

export const updatePerson = (id, person, history) => async dispatch => {
  try {
    await axios.put(`/api/person/${id}`, person);
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

export const getPerson = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/person/${id}`);
    dispatch({
      type: GET_PERSON,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};
