import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Courses from '../components/Courses'; // Adjust the path based on your project structure

/**
 * The Home component fetches available courses and displays them
 * using the `Courses` component.
 * 
 * @returns {JSX.Element} The Home component displaying a list of courses.
 */
function Home() {
  const [courses, setCourses] = useState([]);

  /**
   * Fetches course data from the backend API when the component mounts.
   * Updates the `courses` state with the retrieved data.
   */
  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => setCourses(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='coursesContainer'>
      <h1>Can Academy courses available for you</h1>
      <Courses courses={courses} />
    </div>
  );
}

/**
 * Exports the Home component as the default export.
 */
export default Home;
