const mongoose = require("mongoose");

const contactNumberSchema = mongoose.Schema({
  contactNumber: { type: String, required: true },
  contactNumberType: {
    type: String,
    uppercase: true,
    enum: ["WORK", "HOME", "MOBILE", "PHONE"],
    default: "MOBILE",
  },
});

module.exports = mongoose.model("ContactNumber", contactNumberSchema);
