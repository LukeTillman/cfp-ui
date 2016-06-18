import xhr from 'xhr';

// Action type constants
export const ActionTypes = {
  // Auth
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',

  // Loading abstracts
  GET_ABSTRACTS: 'GET_ABSTRACTS',
  GET_ABSTRACTS_COMPLETE: 'GET_ABSTRACTS_COMPLETE'
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

/**
 * Loads the list of available abstracts.
 */
export function getAbstracts() {
  return function getAbstractsImpl(dispatch) {
    // Indicate we're loading
    dispatch({ type: ActionTypes.GET_ABSTRACTS });

    let uri = process.env.NODE_ENV === 'production'
      ? '/abstracts/'
      : '/sample-data/abstracts.json';

    // Make the GET request
    xhr.get(uri, (err, res, body) => {
      // Error making request?
      if (err) {
        dispatch({ 
          type: ActionTypes.GET_ABSTRACTS_COMPLETE, 
          error: true, 
          payload: err 
        });
        return;
      }

      // Non 200 response?
      if (res.statusCode !== 200) {
        dispatch({ 
          type: ActionTypes.GET_ABSTRACTS_COMPLETE, 
          error: true, 
          payload: new Error('Unexpected error while retrieving talk abstracts') 
        });
        return;
      }

      // OK, filter out empty abstracts from response
      let abstracts = JSON.parse(res.body).filter(a => a.upstream_id !== 0);
      dispatch({
        type: ActionTypes.GET_ABSTRACTS_COMPLETE,
        payload: abstracts
      });
    });
  };
};