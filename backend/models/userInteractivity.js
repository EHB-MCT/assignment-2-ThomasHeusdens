const mongoose = require('mongoose');

/**
 * Defines the schema for the UserActivity collection in MongoDB.
 * Each activity records information about user interactions with specific content.
 */
const UserActivitySchema = new mongoose.Schema({
  userId: String,
  contentId: String,
  interactionType: String,
  timestamp: { type: Date, default: Date.now },
});


/**
 * Exports the UserActivity model to interact with the UserActivity collection in MongoDB.
 * @returns {Model} The UserActivity model for querying and recording user activities
 */
module.exports = mongoose.model('UserActivity', UserActivitySchema);