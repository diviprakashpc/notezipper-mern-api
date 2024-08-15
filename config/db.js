const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // If your username password contains special character use encodeURIComponent to get encoded string to use in connection string.
    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error is ${error}`);
  }
};

module.exports = connectDB;
