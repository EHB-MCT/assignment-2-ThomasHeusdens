const mongoose = require("mongoose");

/**
 * Defines the schema for the PersonalisedText collection in MongoDB.
 * This is made so that the user receives a review from us on his learning attitude.
 */
const PersonalisedTextSchema = new mongoose.Schema({
  type: { type: String, required: true },
  average: { type: [Number], required: true },
  firstPartText: { type: String, required: true },
  secondPartText: { type: String, required: true }
},
{ collection: "personalisedTexts" });

/**
 * Exports the PersonalisedText model to interact with the PersonalisedTexts collection in MongoDB.
 * @returns {Model} The PersonalisedText model for querying and manipulating PersonalisedText data
 */
module.exports = mongoose.model("PersonalisedText", PersonalisedTextSchema);