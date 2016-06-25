import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import xhr from 'xhr';

import { store } from './js/redux-store';
import App from './js/app';

// CSS needed by the app
require('bootswatch/flatly/bootstrap.css');
require('gemini-scrollbar/gemini-scrollbar.css');
require('app.css');

// Create an empty div and attach to the body
let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div');
div.id = "cfp-app-wrapper";
body.appendChild(div);

// Ping the proxied site to let it set cookies and such
xhr.get('/api/', (err, res, body) => {
  // Render react app
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});

