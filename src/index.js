import React from 'react';
import ReactDOM from 'react-dom';
// import TaskList from './client/TaskList';
// ReactDOM.render(<TaskList />, el);
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

const el = document.getElementById('app');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
