const express = require("express");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const router = express.Router();
let activeSessions = {};

/**
 * POST /auth/register
 * Registers a new user with a unique UUID and hashed password.
 * @param {String} username - The user's username.
 * @param {String} email - The user's email.
 * @param {String} password - The user's password.
 * @returns {Object} A success message or an error response.
 */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Some fields are missing",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: await getNextSequenceValue("userId"),
      username,
      email,
      password: hashedPassword,
      uuid: uuidv4(),
    });

    const savedUser = await newUser.save();
    res.status(200).send({
      status: "Saved",
      message: "User has been saved!",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong!",
      value: error.message,
    });
  }
});

/**
 * POST /auth/login
 * Authenticates a user by checking the email and password.
 * @param {String} email - The user's email.
 * @param {String} password - The user's password.
 * @returns {Object} A success message with a session token or an error response.
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: "Bad Request",
      message: "Some fields are missing",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user.id, 
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      activeSessions[user.id] = { email: user.email, token };

      res.status(200).send({
        status: "Auth Success",
        message: "You are logged in!",
        data: { username: user.username, email: user.email, token },
      });
    } else {
      res.status(401).send({
        status: "Auth Error",
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong!",
      value: error.message,
    });
  }
});


/**
 * POST /auth/logout
 * Logs out a user by "blacklisting" their token or notifying the client.
 * @returns {Object} A success message or an error response.
 */
router.post("/logout", (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send({
      status: "Auth Error",
      message: "No token provided for logout",
    });
  }

  res.status(200).send({
    status: "Logged Out",
    message: "You have successfully logged out",
  });
});

/**
 * Generates the next sequence value for incremental IDs.
 * @param {String} sequenceName - The sequence name (e.g., "userId").
 * @returns {Number} The next sequence value.
 */
async function getNextSequenceValue(sequenceName) {
  try {
    const countersCollection = mongoose.connection.collection("Counters");

    let sequenceDocument = await countersCollection.findOne({ _id: sequenceName });
    if (!sequenceDocument) {
      sequenceDocument = { _id: sequenceName, sequenceValue: 0 };
      await countersCollection.insertOne(sequenceDocument);
    }

    const result = await countersCollection.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequenceValue: 1 } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    if (!result || typeof result.sequenceValue !== "number") {
      console.error("Debug: Result structure is invalid", result.sequenceValue);
      throw new Error("Invalid sequence value returned");
    }

    console.log("Successfully generated new sequence value:", result.sequenceValue);
    return result.sequenceValue;
  } catch (error) {
    console.error("Error in getNextSequenceValue:", error);
    throw error;
  }
}

/**
 * POST /auth/verifyID
 * Verifies if a UUID exists in the database.
 * @param {String} uuid - The user's UUID.
 * @returns {Object} A success message with user details if the UUID is valid.
 */
router.post("/verifyID", async (req, res) => {
  if (!req.body.uuid) {
    return res.status(400).send({
      status: "Bad Request",
      message: "ID is missing",
    });
  }

  if (!uuidValidate(req.body.uuid)) {
    return res.status(400).send({
      status: "Bad Request",
      message: "ID is not a valid UUID",
    });
  }

  try {
    const user = await User.findOne({ uuid: req.body.uuid });

    if (user) {
      res.status(200).send({
        status: "Verified",
        message: "Your UUID is valid",
        data: {
          username: user.username,
          email: user.email,
          uuid: user.uuid,
        },
      });
    } else {
      res.status(401).send({
        status: "Verify Error",
        message: `No user exists with ID: ${req.body.uuid}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong!",
      value: error.message,
    });
  }
});

/**
 * Exports the router to handle authentication-related API routes.
 * @returns {Router} The router for authentication endpoints
 */
module.exports = router;
