import { GET_ERRORS, RESET_ERRORS } from "../actions/types";

const initState = {};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case RESET_ERRORS:
      return initState;
    default:
      return state;
  }
}
