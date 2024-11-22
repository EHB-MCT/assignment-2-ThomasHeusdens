import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

/**
 * Exports the App component as the default export.
 */
export default App;
