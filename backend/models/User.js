const mongoose = require("mongoose");

/**
 * Schema for storing user information in the database.
 * Includes username, email, hashed password, UUID, and subscription details.
 */
const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uuid: { type: String, required: true, unique: true },
  subscription: { type: String, default: "free" },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
