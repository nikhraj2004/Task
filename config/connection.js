const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`MongoDB URI: ${process.env.MONGO_URI}`); // Add this line
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;