const mongoose = require("mongoose");

/**
 * Defines the schema for the UserTimeSpent collection in MongoDB.
 * Tracks how much time a specific user spent on a specific unit.
 */
const UserTimeSpentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Changed to String
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  videoIncluded: { type: Boolean, required: true },
  timeSpent: { type: Number, required: true }, 
  date: { type: Date, default: Date.now }, 
});

/**
 * Exports the UserTimeSpent model to interact with the UserTimeSpents collection in MongoDB.
 * @returns {Model} The UserTimeSpent model for querying and manipulating UserTimeSpent data.
 */
module.exports = mongoose.model("UserTimeSpent", UserTimeSpentSchema);
