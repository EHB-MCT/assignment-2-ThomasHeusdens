const mongoose = require('mongoose');
const Unit = require('./models/Unit'); // Adjust the path if necessary
require('dotenv').config(); // Ensure environment variables are loaded

/**
 * Converts all `courseId` fields in the `Units` collection to `ObjectId`.
 * This function is intended to be run only once using Node.js when new data is added 
 * to the `Units` collection with `courseId` stored as strings.
 * 
 * Usage: Run `node convertCourseId.js` in the terminal.
 * 
 * @function
 * @async
 * @param {void} None - This function does not accept any parameters.
 * @returns {Promise<void>} Resolves when the operation is complete and logs the number of modified documents.
 * - Logs a message indicating the number of documents updated or an error if the operation fails.
 */

async function convertCourseIdToObjectId() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    // Update courseId fields
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
