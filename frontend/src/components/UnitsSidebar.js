import React from 'react';

/**
 * Renders a sidebar listing all units for a course.
 * Highlights the currently active unit and marks viewed units with a ✓ icon.
 * 
 * @param {Array} units - List of units for the course.
 * @param {Function} onUnitClick - Callback to handle unit selection.
 * @param {Object} selectedUnit - The currently active unit.
 * @param {Array} viewedUnits - List of IDs of the units already viewed by the user.
 * @returns {JSX.Element} The sidebar component listing all units.
 */
function UnitsSidebar({ units, onUnitClick, selectedUnit, viewedUnits }) {
  return (
    <div className='unitsSideBar'>
      <h3>Units</h3>
      <ul className='unitList'>
        {units.map(unit => (
          <li
            className={`${selectedUnit && selectedUnit._id === unit._id ? 'activeUnit' : 'unitOfList'}`}
            key={unit._id}
            onClick={() => onUnitClick(unit)}
          >
            {viewedUnits.includes(unit._id) ? '✓ ' : ''}{unit.title}
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
