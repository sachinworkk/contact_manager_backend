const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = mongoose.Schema({
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
