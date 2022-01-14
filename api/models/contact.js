const mongoose = require("mongoose");
require("mongoose-type-email");

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: [{ type: mongoose.ObjectId, ref: "ContactNumber" }],
  photograph: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
