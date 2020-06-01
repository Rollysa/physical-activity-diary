import { GET_PERSON } from "../actions/types";

const initialState = {
  person: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PERSON:
      return {
        ...state,
        person: action.payload
      };

    default:
      return state;
  }
}
