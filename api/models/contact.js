const mongoose = require("mongoose");
require("mongoose-type-email");

const contactSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  phone: [
    {
      type: mongoose.ObjectId,
      ref: "ContactNumber",
      required: [true, "Contact Number is required"],
    },
  ],
  photograph: { type: String, required: [true, "Photograph is required"] },
  address: { type: String, required: [true, "Address is required"] },
  email: { type: mongoose.SchemaTypes.Email },
  createdBy: { type: mongoose.ObjectId, ref: "User", required: true },
  isFavorite: { type: mongoose.SchemaTypes.Boolean, default: false },
});

module.exports = mongoose.model("Contact", contactSchema);
