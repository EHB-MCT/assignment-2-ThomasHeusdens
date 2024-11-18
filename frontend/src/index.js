import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * The root entry point of the React application.
 * It renders the App component into the root DOM node.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renders the App component within React.StrictMode to help identify potential problems in the application.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
