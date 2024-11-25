const express = require("express");
const UserTimeSpent = require("../models/UserTimeSpent");
const UserScrollPercentage = require("../models/UserScrollPercentage");
const router = express.Router();

/**
 * POST /api/user-behavior/time-spent
 * Logs the user's time spent on a unit page.
 * @param {String} userId - The ID of the user.
 * @param {String} courseId - The ID of the course.
 * @param {String} unitId - The ID of the unit.
 * @param {Boolean} videoIncluded - Whether the unit contains a video.
 * @param {Number} timeSpent - Time spent on the unit in seconds.
 * @returns {Object} A success message or an error response.
 */
router.post("/time-spent", async (req, res) => {
  const { userId, courseId, unitId, videoIncluded, timeSpent } = req.body;

  if (!userId || !courseId || !unitId) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Missing required fields",
    });
  }

  try {
    const existingEntry = await UserTimeSpent.findOne({ userId, courseId, unitId });

    if (existingEntry) {
      existingEntry.timeSpent += timeSpent;
      await existingEntry.save();

      return res.status(200).send({
        status: "Time Spent Updated",
        message: "Time spent has been added to the existing record successfully.",
      });
    } else {
      const newTimeSpent = new UserTimeSpent({
        userId,
        courseId,
        unitId,
        videoIncluded,
        timeSpent,
      });

      await newTimeSpent.save();

      return res.status(200).send({
        status: "New Time Spent Logged",
        message: "A new time spent record has been logged successfully.",
      });
    }
  } catch (error) {
    console.error("Error logging time spent:", error.message);
    res.status(500).send({
      status: "Server Error",
      message: "Failed to log time spent",
      error: error.message,
    });
  }
});

/**
 * POST /api/user-behavior/scroll-percentage
 * Logs the user's scroll percentage on a unit page.
 * @param {String} userId - The ID of the user.
 * @param {String} courseId - The ID of the course.
 * @param {String} unitId - The ID of the unit.
 * @param {Boolean} videoIncluded - Check if the unit has a video or not.
 * @param {Number} scrollPercentage - The percentage of the unit page scrolled by the user (0 to 100).
 * @returns {Object} A success message or an error response.
 */
router.post("/scroll-percentage", async (req, res) => {
  const { userId, courseId, unitId, scrollPercentage, videoIncluded } = req.body;

  if (!userId || !courseId || !unitId || scrollPercentage === undefined || videoIncluded === undefined) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Missing required fields",
    });
  }

  try {
    const existingEntry = await UserScrollPercentage.findOne({ userId, unitId });

    if (existingEntry) {
      if (scrollPercentage > existingEntry.scrollPercentage) {
        existingEntry.scrollPercentage = scrollPercentage;
        existingEntry.videoIncluded = videoIncluded;
        await existingEntry.save();
      }
    } else {
      const newScrollPercentage = new UserScrollPercentage({
        userId,
        courseId,
        unitId,
        scrollPercentage,
        videoIncluded,
      });
      await newScrollPercentage.save();
    }

    res.status(200).send({
      status: "Scroll Percentage Logged",
      message: "User scroll percentage logged successfully.",
    });
  } catch (error) {
    console.error("Error logging scroll percentage:", error);
    res.status(500).send({
      status: "Server Error",
      message: "Failed to log scroll percentage",
    });
  }
});

/**
 * Deletes all but the highest scroll percentage record for a specific user, unit, and course.
 * This endpoint is triggered when leaving a unit or switching to another unit.
 * @param {string} req.body.userId - The ID of the user whose data is being cleaned.
 * @param {string} req.body.courseId - The ID of the course the unit belongs to.
 * @param {string} req.body.unitId - The ID of the unit whose scroll percentages are being cleaned.
 * @returns {Object} A success message if the cleanup is successful, or an error response if something goes wrong.
 */
router.delete("/scroll-percentages", async (req, res) => {
  const { userId, courseId, unitId } = req.body;

  if (!userId || !courseId || !unitId) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Missing required fields",
    });
  }

  try {
    const scrollPercentages = await UserScrollPercentage.find({ userId, courseId, unitId });

    if (scrollPercentages.length === 0) {
      return res.status(404).send({
        status: "Not Found",
        message: "No scroll percentage data found for this user and unit.",
      });
    }

    const highestPercentageDoc = scrollPercentages.reduce((highest, current) =>
      current.scrollPercentage > highest.scrollPercentage ? current : highest
    );

    await UserScrollPercentage.deleteMany({
      userId,
      courseId,
      unitId,
      _id: { $ne: highestPercentageDoc._id },
    });

    res.status(200).send({
      status: "Success",
      message: "Unnecessary scroll percentage documents deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting extra scroll percentages:", error);
    res.status(500).send({
      status: "Server Error",
      message: "Failed to delete unnecessary scroll percentage documents.",
    });
  }
});

/**
 * Exports the router to handle userBehavior-related API routes.
 * @returns {Router} The router for userBehavior endpoints
 */
module.exports = router;
