import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
  const startTimeRef = useRef(null);
  const isLoggingRef = useRef(false);
  const [isFirstUnitLogged, setIsFirstUnitLogged] = useState(false);
  const hasLoggedRef = useRef(false);
  const isLastUnit = selectedUnit && units.length > 0 && units[units.length - 1]._id === selectedUnit._id;
  const navigate = useNavigate();
  const [maxScrollPercentage, setMaxScrollPercentage] = useState(0);

  /**
   * Deletes all unnecessary scroll percentage records for the current unit, keeping only the highest one.
   * @param {Object} selectedUnit - The currently selected unit. Used to identify which unit's records to clean up.
   * @param {string} courseId - The ID of the course to which the unit belongs.
   */
  const deleteExtraScrollPercentages = useCallback(async () => {
    if (!selectedUnit) return; 
  
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const userId = String(decodedToken.id);
  
      await axios.delete(
        'http://localhost:5000/api/user-behavior/scroll-percentages',
        {
          data: {
            userId,
            courseId,
            unitId: selectedUnit._id,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Deleted unnecessary scroll percentages for unit ${selectedUnit.title}`);
    } catch (error) {
      console.error('Error deleting extra scroll percentages:', error);
    }
  }, [selectedUnit, courseId]);  
  
  /**
   * Logs the highest scroll percentage achieved for the current unit to the backend.
   * @param {Object} selectedUnit - The currently selected unit. Required to identify the unit being logged.
   * @param {number} maxScrollPercentage - The highest scroll percentage tracked during the user's session.
   * @param {string} courseId - The ID of the course to which the unit belongs.
   */
  const logScrollPercentage = useCallback(async () => {
    if (!selectedUnit || maxScrollPercentage === 0) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = String(decodedToken.id);

      await axios.post(
        'http://localhost:5000/api/user-behavior/scroll-percentage',
        {
          userId,
          courseId,
          unitId: selectedUnit._id,
          scrollPercentage: maxScrollPercentage,
          videoIncluded: !!selectedUnit.videoURL,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Logged scroll percentage: ${maxScrollPercentage}% for unit ${selectedUnit.title}`);
    } catch (error) {
      console.error('Error logging scroll percentage:', error);
    }
  }, [selectedUnit, maxScrollPercentage, courseId]);

  /**
   * Tracks the user's scroll progress on the current unit and logs the highest scroll percentage upon leaving the unit.
   * @param {Function} logScrollPercentage - A callback function to log the highest scroll percentage to the backend.
   * @param {number} maxScrollPercentage - The current maximum scroll percentage tracked during the user's session.
   * @returns {Function} Cleanup function that removes the scroll event listener and triggers `logScrollPercentage`.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = Math.min(100, (scrolled / scrollHeight) * 100);

      if (percentage > maxScrollPercentage) {
        setMaxScrollPercentage(percentage); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      logScrollPercentage();
    };
  }, [logScrollPercentage, maxScrollPercentage]);
   

  /**
  * Logs the time spent on the unit to the backend.
  * 
  * @param {Object} unit - The unit being viewed.
  * @param {Number} timeSpent - Time spent on the unit in seconds.
  */
  const logTimeSpent = useCallback(async () => {
    if (!selectedUnit || !startTimeRef.current || isLoggingRef.current) return;

    isLoggingRef.current = true;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not authenticated. Token not found.');
      isLoggingRef.current = false;
      return;
    }

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTimeRef.current) / 1000); 

    try {
      const decodedToken = jwtDecode(token);
      const userId = String(decodedToken.id);

      await axios.post(
        'http://localhost:5000/api/user-behavior/time-spent',
        {
          userId,
          courseId,
          unitId: selectedUnit._id,
          videoIncluded: !!selectedUnit.videoURL,
          timeSpent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Logged ${timeSpent} seconds for unit: ${selectedUnit.title}`);
    } catch (error) {
      console.error('Error logging time spent:', error.response?.data || error.message);
    } finally {
      isLoggingRef.current = false;
    }
  }, [selectedUnit, courseId]);

  /**
   * Logs the unit view activity to the backend.
   * Prevents saving duplicates by checking if the unit has already been logged for the user.
   * 
   * @param {Object} unit - The unit being viewed.
   */
  const logUnitView = useCallback(async (unit) => {
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
  }, [courseId, viewedUnits]);

  /**
  * Handles unmount behavior and logs the time spent on the unit.
  * @param {Object} selectedUnit - The currently selected unit. Triggers a start time reset when a new unit is selected.
  * @param {Function} logTimeSpent - Callback to log the time spent on the current unit to the backend.
  * @returns {Function} Cleanup function that logs the time spent on the current unit when unmounting or switching to a new unit.
  */
  useEffect(() => {
    if (selectedUnit) {
      startTimeRef.current = Date.now();
    }

    return () => {
      if (hasLoggedRef.current && startTimeRef.current) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (timeSpent > 0) {
          logTimeSpent();
        }
      } else {
        hasLoggedRef.current = true;
      }
    };
  }, [selectedUnit, logTimeSpent, isFirstUnitLogged]);

  /**
   * Handles "Exit" button click.
   */
  const handleExit = () => {
    deleteExtraScrollPercentages();
    logScrollPercentage();
    logTimeSpent();
    navigate('/');
  };

  /**
   * Fetches unit data for the selected course from the backend API when the component mounts.
   * Retrieves the list of units, initializes the selected unit, and logs user activity for the first unit.
   * Also fetches previously viewed units for the user.
   * 
   * @param {String} courseId - The ID of the current course. Used to fetch units and user activity.
   * @param {Boolean} isFirstUnitLogged - Tracks whether the first unit's activity has already been logged.
   * @param {Function} logUnitView - Callback to log the view activity for the first unit.
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
   * Handles when the user navigates to a new unit or leaves the page.
   */
  const handleUnitSelect = (unit) => {
    deleteExtraScrollPercentages();
    logScrollPercentage();
    setMaxScrollPercentage(0);
    logTimeSpent(); 
    setSelectedUnit(unit);
    logUnitView(unit);

    window.scrollTo(0, 0);
  };

  /**
   * Navigates to the next unit in the list.
   */
  const goToNextUnit = () => {
    if (selectedUnit) {
      const currentIndex = units.findIndex((unit) => unit._id === selectedUnit._id);
      if (currentIndex < units.length - 1) {
        const nextUnit = units[currentIndex + 1];
        handleUnitSelect(nextUnit);
      }
    }
  };

  return (
    <div className="coursePageContainer">
      <button className="exitButton" onClick={handleExit}>
        X
      </button>
      <UnitsSidebar units={units} onUnitClick={handleUnitSelect} selectedUnit={selectedUnit} viewedUnits={viewedUnits} />
      {selectedUnit ? <UnitViewer unit={selectedUnit} /> : <p>Loading...</p>}
      {isLastUnit ? (
        <button className="finishCourseButton" onClick={handleExit}>
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