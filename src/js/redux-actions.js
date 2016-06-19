import xhr from 'xhr';

// Action type constants
export const ActionTypes = {
  // Error message display
  DISMISS_ERROR: 'DISMISS_ERROR',

  // Auth
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',

  // Loading abstracts
  GET_ABSTRACTS: 'GET_ABSTRACTS',
  GET_ABSTRACTS_COMPLETE: 'GET_ABSTRACTS_COMPLETE',

  // Loading comments
  GET_COMMENTS: 'GET_COMMENTS',
  GET_COMMENTS_COMPLETE: 'GET_COMMENTS_COMPLETE',

  // Show/hide a talk's details
  SHOW_DETAILS: 'SHOW_DETAILS',
  HIDE_DETAILS: 'HIDE_DETAILS'
};

/**
 * Helper function for creating an error action object.
 */
function createErrorAction(type, err, meta) {
  return {
    type,
    error: true,
    payload: err,
    meta
  };
}

/**
 * Dismiss any currently displayed error message.
 */
export function dismissError() {
  return { type: ActionTypes.DISMISS_ERROR };
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
        dispatch(createErrorAction(ActionTypes.GET_ABSTRACTS_COMPLETE, err));
        return;
      }

      // Non 200 response?
      if (res.statusCode !== 200) {
        err = new Error('Unexpected error while retrieving talk abstracts');
        dispatch(createErrorAction(ActionTypes.GET_ABSTRACTS_COMPLETE, err));
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

/**
 * Get the comments for an abstract.
 */
function getComments(id) {
  return function getCommentsImpl(dispatch, getState) {
    // See if we already have the comments for the given abstract id loaded
    let { comments } = getState();
    if (comments[id]) {
      return;
    }

    // Nope, so make the request
    dispatch({
      type: ActionTypes.GET_COMMENTS,
      meta: { id }
    });

    let uri = process.env.NODE_ENV === 'production'
      ? `/comments/${id}`
      : `/sample-data/${id}.json`;

    xhr.get(uri, (err, res, body) => {
      // Error making request?
      if (err) {
        dispatch(createErrorAction(ActionTypes.GET_COMMENTS_COMPLETE, err, { id }));
        return;
      }

      // Non 200 response?
      if (res.statusCode !== 200) {
        err = new Error('Unexpected error while retrieving comments');
        dispatch(createErrorAction(ActionTypes.GET_COMMENTS_COMPLETE, err, { id }));
        return;
      }

      // OK, so dispatch comments
      dispatch({
        type: ActionTypes.GET_COMMENTS_COMPLETE,
        payload: JSON.parse(res.body),
        meta: { id } 
      });
    });
  };
};

/**
 * Show the details for a specific abstract.
 */
export function showDetails(id) {
  return function showDetailsImpl(dispatch) {
    // Start loading the comments if necessary, then show the details
    dispatch(getComments(id));
    dispatch({ type: ActionTypes.SHOW_DETAILS, payload: id });
  };
};

/**
 * Hide the details of the currently selected talk.
 */
export function hideDetails() {
  return { type: ActionTypes.HIDE_DETAILS };
};