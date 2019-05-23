import {
  SET_CURRENT_USER,
  SET_USER_INFO,
  GET_PHOTOS,
  UPDATE_USER_INFO,
  UPDATE_PROFIL_SETTING,
  UPDATE_PASSWORD,
  RESET_USER,
  GET_BLOCKED_USERS,
  GET_GRADED_USERS,
  LOGIN_PENDING
} from "../actions/types";

const initState = {
  isAuthenticated: false,
  user: {},
  profilInfo: {},
  photoList: [],
  blockedUsers: {},
  gradedUsers: {},
  loading: false
};

function isEmpty(str) {
  return !str || Object.keys(str).length === 0;
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_USER_INFO:
      return {
        ...state,
        profilInfo: action.payload
      };
    case GET_PHOTOS:
      return {
        ...state,
        photoList: action.payload
      };

    case UPDATE_PROFIL_SETTING:
      return {
        ...state,
        profilInfo: {
          ...state.profilInfo,
          nickname: action.payload.nickname,
          email: action.payload.email
        }
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        profilInfo: {
          ...state.profilInfo,
          password: action.payload.new_pwd
        }
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        profilInfo: {
          ...state.profilInfo,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          age: action.payload.age,
          details: action.payload.details,
          gender_id: action.payload.gender_id,
          orientation_id: action.payload.orientation_id,
          tags: action.payload.tags
        }
      };
    case RESET_USER:
      return initState;
    case GET_BLOCKED_USERS:
      return {
        ...state,
        blockedUsers: action.payload
      };
    case GET_GRADED_USERS:
      return {
        ...state,
        gradedUsers: action.payload
      };
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default authReducer;
