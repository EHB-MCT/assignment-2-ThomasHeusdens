const express = require("express");
const UserActivity = require("../models/UserActivity");
const router = express.Router();

/**
 * POST /api/user-activity
 * Logs a unit view activity for a specific user.
 * Ensures no duplicate entries for the same user and unit.
 * @param {String} userId - The ID of the user.
 * @param {String} courseId - The ID of the course.
 * @param {String} unitId - The ID of the unit.
 * @returns {Object} A success message or an error response.
 */
router.post("/", async (req, res) => {
  const { userId, courseId, unitId } = req.body;

  if (!userId || !courseId || !unitId) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Missing required fields",
    });
  }

  try {
    const existingActivity = await UserActivity.findOne({ userId, unitId });

    if (existingActivity) {
      return res.status(200).send({
        status: "Activity Exists",
        message: "This unit has already been logged as viewed for this user.",
      });
    }

    const newActivity = new UserActivity({
      userId,
      courseId,
      unitId,
      viewedAt: new Date(),
    });

    await newActivity.save();

    res.status(200).send({
      status: "Activity Logged",
      message: "Unit view has been logged successfully.",
    });
  } catch (error) {
    res.status(500).send({
      status: "Server Error",
      message: "Failed to log unit view",
      error: error.message,
    });
  }
});

/**
 * GET /api/user-activity/:userId/:unitId
 * Checks if a unit view activity already exists for a specific user and unit.
 * @param {String} userId - The ID of the user.
 * @param {String} unitId - The ID of the unit.
 * @returns {Object} Whether the activity is already logged or not.
 */
router.get("/:userId/:unitId", async (req, res) => {
  const { userId, unitId } = req.params;
  try {
    const activity = await UserActivity.findOne({ userId, unitId });
    res.status(200).send({ alreadyLogged: !!activity });
  } catch (error) {
    console.error("Error checking user activity:", error.message);
    res.status(500).send({ error: error.message });
  }
});

/**
 * GET /:userId/course/:courseId
 * Retrieves a list of unit IDs that the specified user has viewed within a specific course.
 * @param {String} userId - The ID of the user whose activity is being queried.
 * @param {String} courseId - The ID of the course for which unit activity is being retrieved.
 * @returns {Object} An object containing an array of viewed unit IDs, or an error response in case of failure.
 */
router.get('/:userId/course/:courseId', async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const activities = await UserActivity.find({ userId, courseId });
      const viewedUnits = activities.map(activity => activity.unitId);
      res.status(200).send({ viewedUnits });
    } catch (error) {
      console.error('Error fetching viewed units:', error.message);
      res.status(500).send({ error: error.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const texts = await UserActivity.find();
    res.status(200).json(texts);
  } catch (err) {
    console.error("Error fetching user activities:", err.message);
    res.status(500).json({ error: "Failed to fetch user activities." });
  }
});

  
/**
 * Exports the router to handle userActivity-related API routes.
 * @returns {Router} The router for userActivity endpoints
 */
module.exports = router;
