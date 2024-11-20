import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The Courses component renders a list of courses.
 * Each course is clickable and navigates to its dedicated page.
 * 
 * @param {Array} courses - List of courses to display.
 * @returns {JSX.Element} The Courses component with clickable course cards.
 */
function Courses({ courses }) {
  return (
    <div className='courses'>
      {courses.map(course => (
        <Link to={`/courses/${course._id}`} key={course._id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='course'>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
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
