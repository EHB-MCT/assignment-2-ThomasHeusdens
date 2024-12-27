const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

/**
 * GET /api/units
 * Retrieves all units from the database.
 * @returns {Array} A list of all units.
 */
router.get('/', async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/units/:courseId
 * Retrieves all units for a specific course.
 * @param {String} courseId - The ID of the course to filter units by.
 * @returns {Array} A list of units for the specified course.
 */
router.get('/:courseId', async (req, res) => {
  try {
    const units = await Unit.find({ courseId: req.params.courseId });
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Exports the router to handle unit-related API routes.
 * @returns {Router} The router for unit endpoints
 */
module.exports = router;
