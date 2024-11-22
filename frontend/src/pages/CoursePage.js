import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
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
  const [viewedUnits, setViewedUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isFirstUnitLogged, setIsFirstUnitLogged] = useState(false);
  const navigate = useNavigate();

   /**
   * Logs the unit view activity to the backend.
   * Prevents saving duplicates by checking if the unit has already been logged for the user.
   * @param {Object} unit - The unit being viewed.
   */
  const logUnitView = useCallback(
    async (unit) => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('User is not authenticated. Token not found.');
        return;
      }

      if (viewedUnits.includes(unit._id)) {
        console.log(`Unit already logged: ${unit.title}`);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:5000/api/user-activity/${userId}/${unit._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.data.alreadyLogged) {
          await axios.post(
            'http://localhost:5000/api/user-activity',
            { userId, courseId, unitId: unit._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(`Unit viewed: ${unit.title}`);
          setViewedUnits((prev) => [...prev, unit._id]);
        } else {
          console.log(`Unit already viewed: ${unit.title}`);
        }
      } catch (error) {
        console.error('Failed to log unit view:', error.response?.data || error.message);
      }
    },
    [courseId, viewedUnits]
  );

   /**
   * Fetches unit data from the backend API when the component mounts.
   * Updates the units state with the retrieved data.
   * Automatically selects and logs the first unit in the list.
   */
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/units/${courseId}`);
        const fetchedUnits = response.data;
        setUnits(fetchedUnits);

        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;

          const viewedResponse = await axios.get(
            `http://localhost:5000/api/user-activity/${userId}/course/${courseId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setViewedUnits(viewedResponse.data.viewedUnits || []);
        }

        if (fetchedUnits.length > 0 && !isFirstUnitLogged) {
          const firstUnit = fetchedUnits[0];
          setSelectedUnit(firstUnit);
          logUnitView(firstUnit);
          setIsFirstUnitLogged(true);
        }
      } catch (err) {
        console.error('Error fetching units:', err);
      }
    };

    fetchUnits();
  }, [courseId, isFirstUnitLogged, logUnitView]);

  /**
   * Updates the selected unit and logs the activity.
   * @param {Object} unit - The unit being selected.
   */
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    logUnitView(unit);
  };

  /**
   * Navigates to the next unit in the list and logs the activity.
   */
  const goToNextUnit = () => {
    if (selectedUnit) {
      const currentIndex = units.findIndex((unit) => unit._id === selectedUnit._id);
      if (currentIndex < units.length - 1) {
        const nextUnit = units[currentIndex + 1];
        setSelectedUnit(nextUnit);
        logUnitView(nextUnit);
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
    <div className="coursePageContainer">
      <Link to="/" className="exitButton">
        X
      </Link>
      <UnitsSidebar units={units} onUnitClick={handleUnitSelect} selectedUnit={selectedUnit} viewedUnits={viewedUnits} />
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
