import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import UnitsSidebar from '../components/UnitsSidebar';
import UnitViewer from '../components/UnitViewer';

/**
 * The CoursePage displays the units for a specific course and renders the content of the selected unit in the center of the page.
 * It also includes a sidebar listing all units for the course, which allows 
 * 
 * @returns {JSX.Element} The CoursePage component with a sidebar and unit viewer.
 */
function CoursePage() {
  const { courseId } = useParams();
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);

  /**
   * Fetches unit data from the backend API when the component mounts.
   * Updates the `units` state with the retrieved data.
   * Also select the first unit of the list to display it later.
   */
  useEffect(() => {
    axios.get(`http://localhost:5000/api/units/${courseId}`)
      .then(response => {
        setUnits(response.data);
        if (response.data.length > 0) setSelectedUnit(response.data[0]);
      })
      .catch(err => console.error(err));
  }, [courseId]);

  return (
    <div className='coursePageContainer'>
      <Link to="/" className="exitButton">X</Link>
      <UnitsSidebar units={units} onUnitClick={setSelectedUnit} />
      {selectedUnit ? <UnitViewer unit={selectedUnit} /> : <p>Loading...</p>}
    </div>
  );
}

/**
 * Exports the CoursePage component as the default export.
 */
export default CoursePage;
