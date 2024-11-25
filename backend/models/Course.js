const mongoose = require('mongoose');

/**
 * Defines the schema for the Course collection in MongoDB.
 * Each course contains information about the title, description and creation date.
 */
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

/**
 * Exports the Course model to interact with the Courses collection in MongoDB.
 * @returns {Model} The Course model for querying and manipulating course data
 */
module.exports = mongoose.model('Course', CourseSchema);
