import React from 'react';

/**
 * Renders a sidebar listing all units for a course.
 * Allows selecting a unit to display its content.
 * 
 * @param {Array} units - List of units for the course.
 * @param {Function} onUnitClick - Callback to handle unit selection.
 */
function UnitsSidebar({ units, onUnitClick }) {
  return (
    <div className='unitsSideBar'>
      <h3>Units</h3>
      <ul className='unitList'>
        {units.map(unit => (
          <li
            className='unitOfList'
            key={unit._id}
            onClick={() => onUnitClick(unit)}
          >
            {unit.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Exports the UnitsSidebar component as the default export.
 */
export default UnitsSidebar;
