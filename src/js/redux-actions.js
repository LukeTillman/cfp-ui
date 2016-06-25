import xhr from 'xhr';
import { ActionTypes as AuthActionTypes, startSignIn, startSignOut } from './auth.js';

// Action type constants
export const ActionTypes = {
  // Error message display
  DISMISS_ERROR: 'DISMISS_ERROR',

  // Auth
  SIGN_IN: AuthActionTypes.SIGN_IN,
  SIGN_OUT: AuthActionTypes.SIGN_OUT,

  // Loading abstracts
  GET_ABSTRACTS: 'GET_ABSTRACTS',
  GET_ABSTRACTS_COMPLETE: 'GET_ABSTRACTS_COMPLETE',

  // Loading comments
  GET_COMMENTS: 'GET_COMMENTS',
  GET_COMMENTS_COMPLETE: 'GET_COMMENTS_COMPLETE',

  // Abstract list actions
  CHANGE_SELECTION: 'CHANGE_SELECTION',
  CHANGE_SORT_BY: 'CHANGE_SORT_BY',
  CHANGE_NEXT_DISABLED: 'CHANGE_NEXT_DISABLED',
  CHANGE_PREVIOUS_DISABLED: 'CHANGE_PREVIOUS_DISABLED',
  TOGGLE_SORT_DIRECTION: 'TOGGLE_SORT_DIRECTION'
};

/**
 * Available sorting values
 */
export const SortByValues = {
  DEFAULT: 'Default',
  TITLE: 'Title',
  AUTHOR: 'Author',
  COMPANY: 'Company',
  RATING: 'Rating'
};

/**
 * Available sort directions.
 */
export const SortDirectionValues = {
  ASC: 'ASC',
  DESC: 'DESC'
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
export function signIn() {
  return startSignIn;
};

/**
 * Signs the current user out.
 */
export function signOut() {
  return startSignOut;
};

/**
 * Loads the list of available abstracts.
 */
export function getAbstracts() {
  return function getAbstractsImpl(dispatch) {
    // Indicate we're loading
    dispatch({ type: ActionTypes.GET_ABSTRACTS });

    // Make the GET request
    xhr.get('/api/abstracts/', (err, res, body) => {
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
      let abstracts = res.body === null ? [] : JSON.parse(res.body);
      abstracts = abstracts
        .filter(a => a.upstream_id !== 0)
        .reduce((acc, abstract) => {
          // Index by id
          acc[abstract.id] = abstract;
          return acc;
        }, { })

      dispatch({
        type: ActionTypes.GET_ABSTRACTS_COMPLETE,
        payload: abstracts
      });
    });
  };
};

/**
 * Change the selected talk index.
 */
export function changeSelection(idx) {
  return {
    type: ActionTypes.CHANGE_SELECTION,
    payload: idx
  };
};

/**
 * Goto the next talk in the list.
 */
export function nextTalk() {
  return function nextTalkImpl(dispatch, getState) {
    let { abstractList: { nextDisabled, selectedIndex } } = getState();
    if (nextDisabled) return;
    dispatch(changeSelection(selectedIndex + 1));
  };
};

/**
 * Goto the previous talk in the list.
 */
export function previousTalk() {
  return function previousTalkImpl(dispatch, getState) {
    let { abstractList: { previousDisabled, selectedIndex } } = getState();
    if (previousDisabled) return;
    dispatch(changeSelection(selectedIndex - 1));
  };
};

/**
 * Change how the abstract list is sorted.
 */
export function changeSortBy(value) {
  return {
    type: ActionTypes.CHANGE_SORT_BY,
    payload: value
  };
};

/**
 * Change whether going to the next talk is disabled.
 */
export function changeNextDisabled(val) {
  return { type: ActionTypes.CHANGE_NEXT_DISABLED, payload: val };
};

/**
 * Change whether going to the previous talk is disabled.
 */
export function changePreviousDisabled(val) {
  return { type: ActionTypes.CHANGE_PREVIOUS_DISABLED, payload: val };
};

/**
 * Toggle the sort direction.
 */
export function toggleSortDirection() {
  return { type: ActionTypes.TOGGLE_SORT_DIRECTION };
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

    xhr.get(`/api/comments/${id}`, (err, res, body) => {
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