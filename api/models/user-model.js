const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  provider: String,
  displayName: String,
  steamId: String,
  photos: [{ value: String }, { value: String }, { value: String }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
