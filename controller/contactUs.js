const Contactus = require("../schema/contactUs");

const contactMessage = async (req, res) => {
  try {
    const contact = new Contactus({ ...req.body });
    const result = await contact.save();
    res.status(200).json({
      message: "Query submitted successfully",
      data: result,
    });
  } catch (e) {
    res.status(404).json(e);
  }
};

module.exports = contactMessage;
