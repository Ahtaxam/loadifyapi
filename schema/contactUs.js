const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactUsModal = mongoose.model("Contactus", contactUsSchema);
module.exports = ContactUsModal;
