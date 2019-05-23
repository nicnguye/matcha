import {
  GET_MATCHS,
  GET_LIKES,
  ADD_LIKE,
  ADD_POPULARITY,
  DELETE_POPULARITY,
  DELETE_LIKE,
  GET_MATCH_INFO
} from "../actions/types";

const initState = {
  matchsList: [],
  activeMatch: {},
  likesList: []
};

const matchReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MATCHS:
      return {
        ...state,
        matchsList: action.payload
      };

    case GET_LIKES:
      return {
        ...state,
        likesList: action.payload
      };

    case ADD_LIKE:
      return {
        ...state,
        likesList: [...state.likesList, action.payload]
      };

    case ADD_POPULARITY:
      const updatedItems = state.matchsList.map((item, index) => {
        if (item.id === action.payload)
          return { ...item, popularity: parseInt(item.popularity) + 1 };
        return item;
      });
      return { ...state, matchsList: updatedItems };

    case DELETE_POPULARITY:
      const deletedItems = state.matchsList.map((item, index) => {
        if (item.id === action.payload)
          return { ...item, popularity: parseInt(item.popularity) - 1 };
        return item;
      });
      return { ...state, matchsList: deletedItems };

    case DELETE_LIKE:
      return {
        ...state,
        likesList: state.likesList.filter(
          item => item.liked_id !== action.payload
        )
      };

    case GET_MATCH_INFO:
      return {
        ...state,
        activeMatch: action.payload
      };

    default:
      return state;
  }
};

export default matchReducer;
