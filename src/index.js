import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';

const el = document.getElementById('app');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
