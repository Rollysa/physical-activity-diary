import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import activityReducer from "./activityReducer";
import securityReducer from "./securityReducer";
import personReducer from "./personReducer";
import chartReducer from "./chartReducer";

export default combineReducers({
  errors: errorReducer,
  activity: activityReducer,
  security: securityReducer,
  person: personReducer,
  chart: chartReducer,
});
