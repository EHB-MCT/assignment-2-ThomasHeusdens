import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";

/**
 * Register page for user registration.
 * Renders a registration form and handles user registration functionality.
 *
 * @returns {JSX.Element} The Register page component.
 */
function Register() {
    const navigate = useNavigate();
  /**
   * Handles form submission for registration.
   * Sends a POST request to the backend with user details.
   * @param {Object} formData - The data entered by the user in the registration form.
   */
  const handleRegister = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", formData);
      console.log(response.data);
      navigate("/login");
      alert("Registration successful! Please login.");
    } catch (error) {
      console.error(error.response?.data?.message || "Registration failed!");
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return <AuthForm type="Register" onSubmit={handleRegister} />;
}

/**
 * Exports the Register component as the default export.
 */
export default Register;
