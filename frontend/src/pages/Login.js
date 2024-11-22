import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";

/**
 * Login page for user authentication.
 * Renders a login form and handles user login functionality.
 *
 * @returns {JSX.Element} The Login page component.
 */
function Login() {
    const navigate = useNavigate();
    /**
     * Handles form submission for login.
     * Sends a POST request to the backend with user credentials.
     * @param {Object} formData - The data entered by the user in the login form.
     */
    const handleLogin = async (formData) => {
        try {
        const response = await axios.post("http://localhost:5000/auth/login", formData);
        console.log(response.data);
        navigate("/");
        alert("Login successful!");
        localStorage.setItem("token", response.data.data.token);
        } catch (error) {
        console.error(error.response?.data?.message || "Login failed!");
        alert(error.response?.data?.message || "Login failed!");
        }
    };

    return <AuthForm type="Login" onSubmit={handleLogin} />;
}

/**
 * Exports the Login component as the default export.
 */
export default Login;
