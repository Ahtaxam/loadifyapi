const User = require("../schema/user");
const jwt = require("jsonwebtoken");
const config = require("../config/jwtKey");
const handleEmail = require("../utils/emailHandler");
require("dotenv").config();

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does't exist." });
      return;
    }

    const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);

    const subject = "Reset your Password";
    const text = `${process.env.CLIENT_URL}/reset-password/${user?._id}/${token}
      `;

    await handleEmail(email, subject, text);

    return res
      .status(200)
      .json({ message: "Password reset instructions sent to your email." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = forgotPassword;
