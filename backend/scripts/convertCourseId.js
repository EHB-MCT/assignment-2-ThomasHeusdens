const mongoose = require('mongoose');
const Unit = require('../models/Unit');
require('dotenv').config(); 

/**
 * Converts all `courseId` fields in the `Units` collection to `ObjectId`.
 * This function is intended to be run only once using Node.js when new data is added 
 * to the `Units` collection with `courseId` stored as strings.
 * 
 * Usage:
 * First: Run `cd backend\scripts`  
 * Then: Run `node convertCourseId.js` in the terminal.
 */

async function convertCourseIdToObjectId() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    const result = await Unit.updateMany(
      {},
      [{ $set: { courseId: { $toObjectId: "$courseId" } } }]
    );

    console.log(`Updated ${result.modifiedCount} documents.`);
  } catch (err) {
    console.error("Error during conversion:", err);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

/**
 * Executes the `convertCourseIdToObjectId` function to update the `courseId` fields in the `Units` collection from strings to `ObjectId`.
 */
convertCourseIdToObjectId();
