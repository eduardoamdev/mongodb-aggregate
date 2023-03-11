const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/vip-customers")
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log(`Database connection error: ${error}`);
    });
};

module.exports = { dbConnection };
