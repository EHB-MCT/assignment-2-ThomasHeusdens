import React from 'react';

/**
 * Renders the content and description of a unit, including an optional video if present.
 * 
 * @param {Object} unit - The unit to display.
 */
function UnitViewer({ unit }) {
  return (
    <div className='unitViewer' style={{  }}>
      <h1>{unit.title}</h1>
      {unit.videoURL ? (
        <div className='embeddedVideo'>
          <iframe
            width="560"
            height="315"
            src={unit.videoURL}
            title={unit.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}
      <p>{unit.description}</p>
      <h3>{unit.titleFirstPart}</h3>
      <p>{unit.contentFirstPart}</p>
      <h3>{unit.titleSecondPart}</h3>
      <p>{unit.contentSecondPart}</p>
      <h3>{unit.titleThirdPart}</h3>
      <p>{unit.contentThirdPart}</p>
    </div>
  );
}

/**
 * Exports the UnitViewer component as the default export.
 */
export default UnitViewer;
