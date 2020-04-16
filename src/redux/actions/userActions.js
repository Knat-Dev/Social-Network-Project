import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API}/login`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((e) => {
      console.error(e);
      dispatch({
        type: SET_ERRORS,
        payload: e.response.data,
      });
    });
};

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API}/signup`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((e) => {
      console.error(e);
      dispatch({
        type: SET_ERRORS,
        payload: e.response.data,
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`${process.env.REACT_APP_API}/user`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((e) => console.error(e));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${process.env.REACT_APP_API}/user`, userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((e) => console.error(e));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${process.env.REACT_APP_API}/user/image`, formData)
    .then((response) => {
      dispatch(getUserData());
    })
    .catch((e) => console.error(e));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  console.log(notificationIds);
  axios
    .post(`${process.env.REACT_APP_API}/notifications`, notificationIds)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ, payload: notificationIds });
    })
    .catch((e) => console.error(e));
};
