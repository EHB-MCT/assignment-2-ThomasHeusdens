import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Courses from "../components/Courses";

/**
 * The Home component fetches available courses and displays them
 * using the `Courses` component. It also includes login, register,
 * and logout buttons based on the user's authentication state.
 * 
 * @returns {JSX.Element} The Home component displaying a list of courses and navigation buttons.
 */
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  /**
   * Checks for a token in localStorage to determine the user's login status.
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  /**
   * Fetches course data from the backend API when the component mounts.
   * Updates the `courses` state with the retrieved data.
   */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => setCourses(response.data))
      .catch((err) => console.log(err));
  }, []);

  /**
   * Handles user logout by sending a request to the backend and
   * clearing the session token from localStorage.
   */
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      alert("You have been logged out.");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="coursesContainer">
      <div className="header">
        <h1>Can Academy courses available for you</h1>
        <div className="authButtons">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="authButton">Login</button>
              </Link>
              <Link to="/register">
                <button className="authButton">Register</button>
              </Link>
            </>
          ) : (
            <button className="authButton" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      <Courses courses={courses} />
    </div>
  );
}

/**
 * Exports the Home component as the default export.
 */
export default Home;
