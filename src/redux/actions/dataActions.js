import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${process.env.REACT_APP_API}/scream/${screamId}`)
    .then((res) => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((e) => {
      console.error(e);
    });
};

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${process.env.REACT_APP_API}/screams`)
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch(() => dispatch({ type: SET_SCREAMS, payload: [] }));
};

export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API}/scream/${screamId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_SCREAM, payload: res.data });
    })
    .catch((e) => console.error(e));
};

export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API}/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_SCREAM, payload: res.data });
    })
    .catch((e) => console.error(e));
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API}/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((e) => console.error(e));
};

export const postScream = (scream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API}/scream`, scream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((e) => {
      console.error(e);
      dispatch({ type: SET_ERRORS, payload: e.response.data });
    });
};

export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API}/scream/${screamId}/comment`)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((e) => {
      dispatch({ type: SET_ERRORS, payload: e.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
