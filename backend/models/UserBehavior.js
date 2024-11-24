const mongoose = require("mongoose");

/**
 * Defines the schema for the UserBehavior collection in MongoDB.
 * Tracks how much time a specific user spent on a specific course.
 */
const userBehaviorSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Changed to String
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  videoIncluded: { type: Boolean, required: true },
  timeSpent: { type: Number, required: true }, 
  date: { type: Date, default: Date.now }, 
});

/**
 * Exports the UserBehavior model to interact with the UserBehaviors collection in MongoDB.
 * @returns {Model} The UserBehavior model for querying and manipulating UserBehavior data.
 */
module.exports = mongoose.model("UserBehavior", userBehaviorSchema);
