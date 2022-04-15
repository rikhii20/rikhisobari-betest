const { Schema, model } = require("mongoose");

const schema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: String,
    required: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    indexes: 1,
  },
  identityNumber: {
    type: String,
    required: true,
    indexes: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = model("user", schema);
