/**
 * Reports web performance metrics using the web-vitals library.
 * If a callback function is provided, it captures and logs key web vitals metrics.
 * 
 * @param {Function} onPerfEntry - A callback function to handle the web vitals data.
 * @returns {void}
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

/**
 * Exports the reportWebVitals component as the default export.
 */
export default reportWebVitals;
