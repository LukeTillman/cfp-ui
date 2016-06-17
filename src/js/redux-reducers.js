import { ActionTypes } from './redux-actions';

const defaultState = {
  email: null
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
  }

  return state;
};

export default rootReducer;