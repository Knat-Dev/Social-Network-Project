import {
  LOADING_DATA,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_PROFILE_SCREAMS,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  profile: {},
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
    case SET_PROFILE_SCREAMS:
      return {
        ...state,
        profile: action.payload,
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
      console.log(action.payload);
      state.profile.screams[index] = action.payload;
      console.log(state.profile);
      return {
        ...state,
        profile: {
          ...state.profile,
          screams:
            state.profile.screams &&
            state.profile.screams.map((scream) => {
              if (action.payload.screamId === scream.screamId)
                return { ...state.scream, ...action.payload };
              return scream;
            }),
        },
      };
    }
    case DELETE_SCREAM: {
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
        profile: {
          ...state.profile,
          screams:
            state.profile.screams &&
            state.profile.screams.filter(
              (scream) => scream.screamId !== action.payload
            ),
        },
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        screams: [action.payload, ...state.screams],
        profile: {
          ...state.profile,
          screams: [action.payload, ...state.profile.screams],
        },
      };
    }
    case SUBMIT_COMMENT: {
      return {
        ...state,
        screams: state.screams.map((scream) => {
          if (scream.screamId === state.scream.screamId)
            return { ...scream, commentCount: scream.commentCount + 1 };
          else return scream;
        }),
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
        profile: {
          ...state.profile,
          screams:
            state.profile.screams &&
            state.profile.screams.map((scream) => {
              if (scream.screamId === state.scream.screamId)
                return { ...scream, commentCount: scream.commentCount + 1 };
              else return scream;
            }),
        },
      };
    }
    default:
      return state;
  }
};
