import { ActionTypes } from './redux-actions';

const defaultState = {
  errorMessage: null,
  email: null,
  talksLoading: false,
  talks: [ ]
};

export function rootReducer(state = defaultState, action) {
  switch(action.type) {
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

    case ActionTypes.GET_ABSTRACTS:
      return {
        ...state,
        talksLoading: true
      };

    case ActionTypes.GET_ABSTRACTS_COMPLETE:
      let talks = action.error === true ? state.talks : action.payload;
      let errorMessage = action.error === true ? action.payload.message : state.errorMessage;
      return {
        ...state,
        talksLoading: false,
        talks,
        errorMessage
      };

  }

  return state;
};

export default rootReducer;