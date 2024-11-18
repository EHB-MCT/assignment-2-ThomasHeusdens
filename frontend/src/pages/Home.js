import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * The Home component displays a list of available courses.
 * It fetches data from the backend API and renders it dynamically.
 * @returns {JSX.Element} The Home component with a list of courses.
 */
function Home() {
  const [courses, setCourses] = useState([]);

  /**
   * Fetches course data from the backend API when the component mounts.
   * Updates the `content` state with the retrieved data.
   */
  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(response => setCourses(response.data))
      .catch(err => console.log(err));
  }, []);  

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.map(course => (
        <div key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <a href={course.videoURL}>Watch Video</a>
        </div>
      ))}
    </div>
  );
}

/**
 * Exports the Home component as the default export.
 */
export default Home;
