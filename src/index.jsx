import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './js/redux-store';
import App from './js/app';

// CSS needed by the app
require('bootswatch/flatly/bootstrap.css');
require('app.css');

// Create an empty div and attach to the body
let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div');
body.appendChild(div);

// Render react app
render(
  <Provider store={store}>
    <App />
  </Provider>,
  div
);