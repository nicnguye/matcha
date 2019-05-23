import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  RESET_ERRORS,
  GET_SUCCESS,
  RESET_SUCCESS,
  SET_CURRENT_USER,
  SET_USER_INFO,
  RESET_USER,
  LOGIN_PENDING
} from "./types";

export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const accountValidation = token => dispatch => {
  axios
    .get("/api/users/validation/" + token)
    .then(res => {
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const resetPassword = userData => dispatch => {
  axios
    .post("/api/users/password-reset", userData)
    .then(res => {
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const resetPasswordValidated = (userData, token) => dispatch => {
  axios
    .post("/api/users/password-validation/" + token, userData)
    .then(res => {
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setResetUser());
};

export const userInfo = userData => dispatch => {
  axios
    .post("/api/users/profil/info", userData)
    .then(res => {
      dispatch({
        type: SET_USER_INFO,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setResetUser = () => {
  return {
    type: RESET_USER
  };
};

export const setErrorMessage = message => {
  return {
    type: GET_ERRORS,
    payload: message
  };
};

export const resetErrorMessage = () => {
  return {
    type: RESET_ERRORS
  };
};

export const setSuccessMessage = message => {
  return {
    type: GET_SUCCESS,
    payload: message
  };
};

export const resetSuccessMessage = () => {
  return {
    type: RESET_SUCCESS
  };
};

export const resetMessage = dispatch => {
  dispatch(resetErrorMessage());
  dispatch(resetSuccessMessage());
};

export const setUserLoading = () => {
  return {
    type: LOGIN_PENDING
  };
};
