import navigator from 'persona';
import xhr from 'xhr';
import { store } from './redux-store';

// Auth action types
export const ActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

function signIn(email) {
  return { 
    type: ActionTypes.SIGN_IN,
    payload: {
      email
    }
  };
}

function signOut() {
  return { type: ActionTypes.SIGN_OUT };
}

// Setup listeners
navigator.id.watch({
  onlogin(assertion) {
    let loginOpts = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `assertion=${encodeURIComponent(assertion)}`
    };

    // Post the assertion to the login handler on the server
    xhr.post('/api/login', loginOpts, (err, res, body) => {
      // TODO: dispatch error
      if (err) {
        navigator.id.logout();
        console.log(err);
        return;
      }

      if (res.statusCode !== 200) {
        navigator.id.logout();
        return;
      }

      let { email } = JSON.parse(res.body);
      store.dispatch(signIn(email));
    });
  },
  onlogout() {
    xhr.post('/api/logout', (err, res, body) => {
      // TODO: dispatch error
      if (err) {
        console.log(err);
        return;
      }

      store.dispatch(signOut());
    });
  }
});

export function startSignIn() {
  navigator.id.request({ siteName: 'Cassandra Summit 2016 CFP Review' });
};

export function startSignOut() {
  navigator.id.logout();
};