const mongoose = require('mongoose');

/**
 * Defines the schema for the Units collection in MongoDB.
 * Each unit is tied to a course and contains theoretical content or a video URL.
 */
const UnitSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
  title: { type: String, required: true }, 
  description: { type: String, required: true },
  videoURL: { type: String }, 
  titleFirstPart: { type: String, required: true }, 
  contentFirstPart: { type: String, required: true },
  titleSecondPart: { type: String, required: true }, 
  contentSecondPart: { type: String, required: true },
  titleThirdPart: { type: String, required: true }, 
  contentThirdPart: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Exports the Unit model to interact with the Units collection in MongoDB.
 * @returns {Model} The Unit model for querying and manipulating unit data
 */
module.exports = mongoose.model('Unit', UnitSchema);
