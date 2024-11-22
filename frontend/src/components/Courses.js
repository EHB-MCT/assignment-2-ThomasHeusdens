import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The Courses component renders a list of courses.
 * Each course is clickable and navigates to its dedicated page.
 * Displays progress if the user is logged in.
 * 
 * @param {Array} courses - List of courses to display.
 * @param {Object} progress - An object mapping course IDs to progress percentages.
 * @param {Boolean} isLoggedIn - Indicates if the user is logged in.
 * @returns {JSX.Element} The Courses component with clickable course cards.
 */
function Courses({ courses, progress, isLoggedIn }) {
  return (
    <div className='courses'>
      {courses.map(course => (
        <Link to={`/courses/${course._id}`} key={course._id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='course'>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {isLoggedIn && progress[course._id] !== undefined && (
              <p>Course done: {progress[course._id]}%</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

/**
 * Exports the Courses component as the default export.
 */
export default Courses;
