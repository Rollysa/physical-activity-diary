import axios from "axios";
import { GET_ERRORS, SET_CURRENT_PERSON } from "./types";
import setJWTToken from "../security/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewPerson = (newPerson, history) => async dispatch => {
  try {
    await axios.post("/api/person/register", newPerson);
    history.push("/login");
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

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post("api/person/login", LoginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decoded_jwtToken = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_PERSON,
      payload: decoded_jwtToken
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_PERSON,
    payload: {}
  });
};

export const forgotPassword = (email, history) => async dispatch => {
  try {
    await axios.post(`/api/person/forgotPassword?email=${email}`);
    history.push("/forgotPassword");
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

export const resetPassword = (token, history) => async dispatch => {
  try {
    await axios.get(`/api/person/resetPassword?token=${token}`);
    history.push("/resetPassword?token" + token);
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

export const savePassword = (newPassword, history) => async dispatch => {
  try {
    await axios.post(`/api/person/resetPassword`, newPassword);
    history.push("/login");
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
