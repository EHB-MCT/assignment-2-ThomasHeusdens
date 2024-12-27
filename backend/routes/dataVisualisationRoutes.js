const express = require("express");
const UserTimeSpent = require("../models/UserTimeSpent");
const UserScrollPercentage = require("../models/UserScrollPercentage");
const UserActivity = require("../models/UserActivity");
const router = express.Router();

/**
 * GET /api/data-visualisation/analytics/scroll
 * Fetches all user scroll analytics data across all courses.
 * @returns {Object} Analytics data for all courses.
 */
router.get('/analytics/scroll', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send({
      status: 'Bad Request',
      message: 'Missing userId parameter',
    });
  }

  try {
    const scrollData = await UserScrollPercentage.find({ userId: String(userId) });
    res.status(200).send({
      status: 'Success',
      data: scrollData,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error.message);
    res.status(500).send({
      status: 'Server Error',
      message: 'Failed to fetch analytics data',
    });
  }
});

/**
 * GET /api/data-visualisation/analytics/time-spent
 * Fetches all user timeSpent analytics data across all courses.
 * @returns {Object} Analytics data for all courses.
 */
router.get('/analytics/time-spent', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send({
      status: 'Bad Request',
      message: 'Missing userId parameter',
    });
  }

  try {
    const timeSpentData = await UserTimeSpent.find({ userId: String(userId) });
    res.status(200).send({
      status: 'Success',
      data: timeSpentData,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error.message);
    res.status(500).send({
      status: 'Server Error',
      message: 'Failed to fetch analytics data',
    });
  }
});

/**
 * GET /api/user-behavior/analytics/:courseId
 * Fetches user analytics data for a specific course. Includes user activities, time spent, and scroll percentages.
 * @param {String} courseId - The ID of the course.
 * @returns {Object} Analytics data for the course.
 */
router.get('/analytics/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.query;

  if (!userId || !courseId) {
    return res.status(400).send({
      status: 'Bad Request',
      message: 'Missing required parameters',
    });
  }

  try {
    const userActivities = await UserActivity.find({ userId: String(userId), courseId });
    const timeSpentData = await UserTimeSpent.find({ userId: String(userId), courseId });
    const scrollData = await UserScrollPercentage.find({ userId: String(userId), courseId });

    res.status(200).send({
      status: 'Success',
      data: {
        activities: userActivities,
        timeSpent: timeSpentData,
        scrollPercentages: scrollData,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error.message);
    res.status(500).send({
      status: 'Server Error',
      message: 'Failed to fetch analytics data',
    });
  }
});

/**
 * Exports the router to handle data-visualisation-related API routes.
 * @returns {Router} The router for data-visualisation endpoints
 */
module.exports = router;