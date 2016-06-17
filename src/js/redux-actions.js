// Action type constants
export const ActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

/**
 * Signs a user in.
 */
export function signIn(email) {
  return { 
    type: ActionTypes.SIGN_IN,
    payload: {
      email
    }
  };
};

/**
 * Signs the current user out.
 */
export function signOut() {
  return { type: ActionTypes.SIGN_OUT };
};