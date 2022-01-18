const mongoose = require("mongoose");

const contactNumberSchema = mongoose.Schema({
  contactNumber: {
    type: String,
    required: [true, "Contact Number is required"],
  },
  contactNumberType: {
    type: String,
    uppercase: true,
    enum: ["WORK", "HOME", "MOBILE", "PHONE"],
    default: "MOBILE",
  },
});

module.exports = mongoose.model("ContactNumber", contactNumberSchema);
