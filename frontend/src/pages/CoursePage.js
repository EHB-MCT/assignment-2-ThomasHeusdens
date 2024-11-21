import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UnitsSidebar from '../components/UnitsSidebar';
import UnitViewer from '../components/UnitViewer';

/**
 * The CoursePage displays the units for a specific course and renders the content of the selected unit in the center of the page.
 * It includes a sidebar for unit navigation and a button to navigate to the next unit or finish the course.
 * 
 * @returns {JSX.Element} The CoursePage component with a sidebar, unit viewer, and navigation buttons.
 */
function CoursePage() {
  const { courseId } = useParams();
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches unit data from the backend API when the component mounts.
   * Updates the `units` state with the retrieved data.
   * Also selects the first unit of the list to display it later.
   */
  useEffect(() => {
    axios.get(`http://localhost:5000/api/units/${courseId}`)
      .then(response => {
        setUnits(response.data);
        if (response.data.length > 0) setSelectedUnit(response.data[0]);
      })
      .catch(err => console.error(err));
  }, [courseId]);

  /**
   * Navigates to the next unit in the list.
   * If the current unit is the last one, the button will not be shown.
   */
  const goToNextUnit = () => {
    if (selectedUnit) {
      const currentIndex = units.findIndex(unit => unit._id === selectedUnit._id);
      if (currentIndex < units.length - 1) {
        setSelectedUnit(units[currentIndex + 1]);
      }
    }
  };

  /**
   * Handles the "Finish Course" button click.
   * Redirects the user to the homepage or a course completion page.
   */
  const finishCourse = () => {
    navigate('/');
  };

  const isLastUnit = selectedUnit && units.length > 0 && units[units.length - 1]._id === selectedUnit._id;

  return (
    <div className='coursePageContainer'>
      <Link to="/" className="exitButton">X</Link>
      <UnitsSidebar units={units} onUnitClick={setSelectedUnit} selectedUnit={selectedUnit} />
      {selectedUnit ? <UnitViewer unit={selectedUnit} /> : <p>Loading...</p>}
      {isLastUnit ? (
        <button className="finishCourseButton" onClick={finishCourse}>
          Finish Course
        </button>
      ) : (
        <button className="nextUnitButton" onClick={goToNextUnit}>
          Next Unit →
        </button>
      )}
    </div>
  );
}

/**
 * Exports the CoursePage component as the default export.
 */
export default CoursePage;
