const mongoose = require('mongoose');

/**
 * Defines the schema for the UserActivity collection in MongoDB.
 * Tracks which units a user has viewed.
 */
const UserActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  viewedAt: { type: Date, default: Date.now },
});

/**
 * Exports the UserActivity model to interact with the UserActivity collection in MongoDB.
 * @returns {Model} The UserActivity model for querying and manipulating user activity data
 */
module.exports = mongoose.model('UserActivity', UserActivitySchema);
