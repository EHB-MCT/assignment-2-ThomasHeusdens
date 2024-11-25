const mongoose = require("mongoose");

/**
 * Defines the schema for the UserScrollPercentage collection in MongoDB.
 * Tracks how much a user scrolled on a specific unit.
 */
const UserScrollPercentageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    scrollPercentage: { type: Number, required: true },
    videoIncluded: { type: Boolean, required: true },
    date: { type: Date, default: Date.now }
  });
  

/**
 * Exports the UserScrollPercentage model to interact with the UserScrollPercentages collection in MongoDB.
 * @returns {Model} The UserScrollPercentage model for querying and manipulating UserScrollPercentage data.
 */
module.exports = mongoose.model("UserScrollPercentage", UserScrollPercentageSchema);