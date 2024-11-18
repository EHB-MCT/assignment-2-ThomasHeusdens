const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

/**
 * GET /api/content
 * Retrieves all courses from the database.
 * @returns {Array} A list of all courses in the Courses collection
 */
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Exports the router to handle course-related API routes.
 * @returns {Router} The router for course endpoints
 */
module.exports = router;
