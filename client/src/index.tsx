import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './pages/App/App';
import Admin from './pages/Admin/Admin';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route component={App} path="/" exact></Route>
      <Route component={Admin} path="/admin"></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
