import axios from "axios";

import {
  GET_MATCHS,
  GET_LIKES,
  ADD_LIKE,
  ADD_POPULARITY,
  DELETE_POPULARITY,
  DELETE_LIKE,
  GET_MATCH_INFO
} from "./types";

export const getMatchList = id => dispatch => {
  axios
    .post("/api/users/matchslist", id)
    .then(res => {
      dispatch({
        type: GET_MATCHS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error getMatch", err);
    });
};

export const getLikesList = id => dispatch => {
  axios
    .post("/api/users/getlikes", id)
    .then(res => {
      dispatch({
        type: GET_LIKES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addLike = data => dispatch => {
  axios
    .post("/api/users/addlike", data)
    .then(res => {
      data.id = res.data;
      dispatch({
        type: ADD_LIKE,
        payload: data
      });
      dispatch({
        type: ADD_POPULARITY,
        payload: data.liked_id
      });
    })
    .catch(err => console.log(err));
};

export const deleteLike = data => dispatch => {
  axios
    .post("/api/users/deletelike", data)
    .then(res => {
      dispatch({
        type: DELETE_LIKE,
        payload: data.liked_id
      });
      dispatch({
        type: DELETE_POPULARITY,
        payload: data.liked_id
      });
    })
    .catch(err => console.log(err));
};

export const getMatchInfo = id => dispatch => {
  axios
    .get(`/api/users/matchinfo/${id}`)
    .then(res => {
      dispatch({ type: GET_MATCH_INFO, payload: res.data });
    })
    .catch(err => {
      console.log("error getMatchInfo", err);
    });
};
