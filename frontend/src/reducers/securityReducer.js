import { SET_CURRENT_PERSON } from "../actions/types";

const initialState = {
  validToken: false,
  person: {}
};

const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PERSON:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        person: action.payload
      };

    default:
      return state;
  }
}
