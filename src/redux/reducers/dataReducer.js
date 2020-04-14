import {
  LOADING_DATA,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAM: {
      return {
        ...state,
        scream: action.payload,
      };
    }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId)
        state.scream = { ...state.scream, ...action.payload };
      return { ...state };
    }
    case DELETE_SCREAM: {
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    }
    case SUBMIT_COMMENT: {
      const { data, screamId } = action.payload;
      const i = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[i] = {
        ...state.screams[i],
        commentCount: state.screams[i].commentCount + 1,
      };
      console.log(state.screams);
      state.scream.commentCount++;
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [data, ...state.scream.comments],
        },
      };
    }
    default:
      return state;
  }
};
