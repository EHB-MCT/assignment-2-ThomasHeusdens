const express = require("express");
const UserBehavior = require("../models/UserBehavior");
const router = express.Router();

/**
 * POST /api/user-behavior
 * Logs the user's behavior on a unit page.
 * @param {String} userId - The ID of the user.
 * @param {String} courseId - The ID of the course.
 * @param {String} unitId - The ID of the unit.
 * @param {Boolean} videoIncluded - Whether the unit contains a video.
 * @param {Number} timeSpent - Time spent on the unit in seconds.
 * @returns {Object} A success message or an error response.
 */
router.post("/", async (req, res) => {
  const { userId, courseId, unitId, videoIncluded, timeSpent } = req.body;

  if (!userId || !courseId || !unitId) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Missing required fields",
    });
  }

  try {
    const newBehavior = new UserBehavior({
      userId, 
      courseId,
      unitId,
      videoIncluded,
      timeSpent,
    });

    await newBehavior.save();
    res.status(200).send({
      status: "Behavior Logged",
      message: "User behavior has been logged successfully.",
    });
  } catch (error) {
    console.error("Error logging user behavior:", error.message);
    res.status(500).send({
      status: "Server Error",
      message: "Failed to log user behavior",
      error: error.message,
    });
  }
});


/**
 * Exports the router to handle userBehavior-related API routes.
 * @returns {Router} The router for userBehavior endpoints
 */
module.exports = router;
