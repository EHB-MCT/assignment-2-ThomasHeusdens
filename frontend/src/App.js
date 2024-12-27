import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/ProtectedRoute'; 
import CourseAnalytics from './pages/CourseAnalytics';
import GeneralAnalytics from "./pages/GeneralAnalytics";

/**
 * The main application component.
 * Configures the routing structure for the application using React Router.
 * Includes protected routes that require user authentication.
 * 
 * @returns {JSX.Element} The App component with the defined routes and protected navigation.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/courses/:courseId"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/analytics/:courseId" 
          element={
          <ProtectedRoute>
            <CourseAnalytics />
          </ProtectedRoute>
        } />
        <Route 
          path="/general-analytics" 
          element={
            <ProtectedRoute>
              <GeneralAnalytics />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}


/**
 * Exports the App component as the default export.
 */
export default App;
