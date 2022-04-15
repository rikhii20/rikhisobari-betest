const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI, {}, (error) => {
    if (error) {
      console.log("Failed to connect");
      return;
    }
    console.log("Connection is established");
  });
};
