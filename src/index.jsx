import React from 'react';
import { render } from 'react-dom';

// CSS needed by the app
require('bootswatch/flatly/bootstrap.css');
require('app.css');

// Create an empty div and attach to the body
let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div');
body.appendChild(div);

// Render react app
render(
  <h1>Hello!</h1>,
  div
);