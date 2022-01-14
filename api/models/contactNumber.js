const mongoose = require("mongoose");

const contactNumberSchema = mongoose.Schema({
  contactNumber: { type: String, required: true },
  contactNumberType: {
    type: String,
    required: true,
    uppercase: true,
    enum: ["WORK", "HOME", "MOBILE", "PHONE"],
    default: "MOBILE",
  },
});

module.exports = mongoose.model("ContactNumber", contactNumberSchema);
