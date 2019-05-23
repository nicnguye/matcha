import axios from "axios";

import {
  GET_ERRORS,
  RESET_ERRORS,
  GET_SUCCESS,
  RESET_SUCCESS,
  UPDATE_USER_INFO,
  UPDATE_PROFIL_SETTING,
  GET_PHOTOS,
  UPDATE_PASSWORD,
  GET_BLOCKED_USERS,
  GET_GRADED_USERS
} from "./types.js";

export const update_profil = profil => dispatch => {
  axios
    .post("/api/users/profil/update", profil)
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_PROFIL_SETTING, payload: profil });
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const update_password = profil => dispatch => {
  axios
    .post("/api/users/profil/update_password", profil)
    .then(res => {
      dispatch({ type: UPDATE_PASSWORD, payload: res.data });
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const updateProfilUser = (id, profil) => dispatch => {
  axios
    .put(`/api/users/profil/update-profil/${id}`, profil)
    .then(res => {
      dispatch({ type: UPDATE_USER_INFO, payload: profil });
      resetMessage(dispatch);
      dispatch(setSuccessMessage(res.data));
    })
    .catch(err => {
      resetMessage(dispatch);
      dispatch(setErrorMessage(err.response.data));
    });
};

export const getPhotos = id => dispatch => {
  axios
    .get("/api/users/profil/photo/" + id)
    .then(res => {
      dispatch({
        type: GET_PHOTOS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getBlockedUser = id => dispatch => {
  axios
    .get(`/api/users/profil/get-blocked/${id}`)
    .then(res => {
      dispatch({ type: GET_BLOCKED_USERS, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const getGradedUser = id => dispatch => {
  axios
    .get(`/api/users/profil/get-graded/${id}`)
    .then(res => {
      dispatch({ type: GET_GRADED_USERS, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const getGoodGrade = id => dispatch => {
  axios
    .get(`/api/users/profil/good-grade/${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
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
