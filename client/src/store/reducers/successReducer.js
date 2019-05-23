import { GET_SUCCESS, RESET_SUCCESS } from "../actions/types";

const initState = {};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    case RESET_SUCCESS:
      return initState;
    default:
      return state;
  }
}
