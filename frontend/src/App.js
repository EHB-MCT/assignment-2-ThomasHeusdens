import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

/**
 * The main application component.
 * Sets up the routing structure for the application using React Router.
 * @returns {JSX.Element} The app component with configured routes.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

/**
 * Exports the App component as the default export.
 */
export default App;
