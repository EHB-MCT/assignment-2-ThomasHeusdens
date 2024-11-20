const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

/**
 * GET /api/units/:courseId
 * Retrieves all units for a specific course.
 * @param {String} courseId - The ID of the course to filter units by.
 * @returns {Array} A list of units for the specified course.
 */
router.get('/:courseId', async (req, res) => {
  try {
    const units = await Unit.find({ courseId: req.params.courseId });
    console.log("Course ID received:", req.params.courseId);
    res.json(units);
    console.log("Units fetched:", units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Exports the router to handle unit-related API routes.
 * @returns {Router} The router for unit endpoints
 */
module.exports = router;
