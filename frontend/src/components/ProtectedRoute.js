import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protects routes by checking for a valid authentication token.
 * Redirects unauthenticated users to the login page.
 * 
 * @param {JSX.Element} children - The component to render if authenticated.
 * @returns {JSX.Element} The protected route or a redirect to login.
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" />;
}

/**
 * Exports the ProtectedRoute component as the default export.
 */
export default ProtectedRoute;