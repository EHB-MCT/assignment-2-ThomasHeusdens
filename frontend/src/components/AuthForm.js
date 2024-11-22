import React, { useState } from "react";
import { Link } from "react-router-dom";


/**
 * AuthForm component renders a form for user authentication (login/register).
 * Handles form input and submission logic.
 *
 * @param {Object} props - Props for the component.
 * @param {String} props.type - The type of the form (e.g., "Login" or "Register").
 * @param {Function} props.onSubmit - Callback function for form submission.
 * @returns {JSX.Element} The AuthForm component.
 */
function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  /**
   * Handles changes in input fields and updates the formData state.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission and prevents the default page reload.
   * Calls the parent component's onSubmit function with formData.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="authForm">
      <h2>{type}</h2>
      {type === "Register" && (
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{type}</button>
      {type === "Register" ? (
          <p>Already an account? Log in <Link to="/login">here</Link></p>  
        ) : (
          <p>You don't have an account yet? Register <Link to="/register">here</Link></p>  
        )}
    </form>
  );
}

/**
 * Exports the AuthForm component as the default export.
 */
export default AuthForm;
