const express = require("express");
const router = express.Router();
const PersonalisedText = require("../models/PersonalisedText");

/**
 * GET /api/personalised-texts
 * Fetches all personalised texts from the database.
 * @returns {Array} An array of all personalised text documents.
 */
router.get("/", async (req, res) => {
  try {
    const texts = await PersonalisedText.find();
    res.status(200).json(texts);
  } catch (err) {
    console.error("Error fetching personalised texts:", err.message);
    res.status(500).json({ error: "Failed to fetch personalised texts." });
  }
});

/**
 * Exports the router to handle personalised-texts API routes.
 * @returns {Router} The router for unit endpoints
 */
module.exports = router;
