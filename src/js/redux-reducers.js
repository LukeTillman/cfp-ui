import { combineReducers } from 'redux';
import { ActionTypes } from './redux-actions';

/**
 * User state
 */

const defaultUserState = { email: null };

function userReducer(state = defaultUserState, action) {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        email: action.payload.email
      };

    case ActionTypes.SIGN_OUT:
      return {
        ...state,
        email: null
      };
  }

  return state;
}

/**
 * Abstract list state
 */

const defaultAbstractListState = {
  loading: false,
  talks: [],
  selectedId: null
};

function abstractListReducer(state = defaultAbstractListState, action) {
  switch (action.type) {
    case ActionTypes.GET_ABSTRACTS:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.GET_ABSTRACTS_COMPLETE:
      let talks = action.error === true ? state.talks : action.payload;
      return {
        ...state,
        loading: false,
        talks
      };
    case ActionTypes.SHOW_DETAILS:
      return {
        ...state,
        selectedId: action.payload
      };

    case ActionTypes.HIDE_DETAILS:
      return {
        ...state,
        selectedId: null
      };
  }
    
  return state;
}

const defaultErrorMessageState = null;
function errorMessageReducer(state = defaultErrorMessageState, action) {
  switch (action.type) {
    case ActionTypes.GET_ABSTRACTS_COMPLETE:
    case ActionTypes.GET_COMMENTS_COMPLETE:
      if (action.error === true) {
        return action.payload.message;
      }
      break;

    case ActionTypes.DISMISS_ERROR:
      return defaultErrorMessageState;
  }

  return state;
}

/**
 * Comments state
 */
const defaultCommentsState = {

};

function commentsReducer(state = defaultCommentsState, action) {
  switch (action.type) {
    case ActionTypes.GET_COMMENTS:
      return {
        ...state,
        [action.meta.id]: []
      };

    case ActionTypes.GET_COMMENTS_COMPLETE:
      if (action.error === true) {
        let newState = {
          ...state
        };
        delete newState[action.meta.id];
        return newState;
      }
      
      return {
        ...state,
        [action.meta.id]: action.payload
      };
  }

  return state;
}

/**
 * The root reducer function
 */
const rootReducer = combineReducers({
  user: userReducer,
  abstractList: abstractListReducer,
  comments: commentsReducer,
  errorMessage: errorMessageReducer
});

export default rootReducer;