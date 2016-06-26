import { combineReducers } from 'redux';
import { ActionTypes, SortByValues, SortDirectionValues } from './redux-actions';

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
 * Data from the server.
 */

const defaultDataState = {
  abstractsById: {},
  commentsByAbstractId: {}
};

function dataReducer(state = defaultDataState, action) {
  if (action.error === true) return state;

  switch (action.type) {
    case ActionTypes.GET_ABSTRACTS_COMPLETE:
      return {
        ...state,
        abstractsById: action.payload
      };

    case ActionTypes.GET_COMMENTS_COMPLETE:
      return {
        ...state,
        commentsByAbstractId: {
          ...state.commentsByAbstractId,
          [action.meta.id]: action.payload
        }
      };

    case ActionTypes.RATE:
      return {
        ...state,
        abstractsById: {
          ...state.abstractsById,
          [action.meta.id]: {
            ...state.abstractsById[action.meta.id],
            scores_a: {
              ...state.abstractsById[action.meta.id].scores_a,
              ...action.payload
            }
          }
        }
      };

    case ActionTypes.SIGN_OUT:
      return defaultDataState;
  }

  return state;
}

/**
 * Abstract list state
 */

const defaultAbstractListState = {
  selectedIndex: -1,
  sortBy: SortByValues.DEFAULT,
  sortDirection: SortDirectionValues.ASC,
  nextDisabled: true,
  previousDisabled: true
};

function abstractListReducer(state = defaultAbstractListState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_SELECTION:
      return {
        ...state,
        selectedIndex: action.payload
      };
    case ActionTypes.CHANGE_NEXT_DISABLED:
      return {
        ...state,
        nextDisabled: action.payload
      };
    case ActionTypes.CHANGE_PREVIOUS_DISABLED:
      return {
        ...state,
        previousDisabled: action.payload
      };
    case ActionTypes.CHANGE_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };
    case ActionTypes.TOGGLE_SORT_DIRECTION:
      let sortDirection = state.sortDirection === SortDirectionValues.ASC 
        ? SortDirectionValues.DESC
        : SortDirectionValues.ASC;
        
      return {
        ...state,
        sortDirection
      };
    
    case ActionTypes.SIGN_OUT:
      return defaultAbstractListState;
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
    case ActionTypes.SIGN_OUT:
      return defaultErrorMessageState;
  }

  return state;
}

const defaultSelectedTalkIdState = null;
function selectedTalkIdReducer(state = defaultSelectedTalkIdState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_DETAILS:
      return action.payload;
    case ActionTypes.SIGN_OUT:
      return defaultSelectedTalkIdState;
  }

  return state;
}

/**
 * The root reducer function
 */
const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  abstractList: abstractListReducer,
  errorMessage: errorMessageReducer,
  selectedTalkId: selectedTalkIdReducer
});

export default rootReducer;