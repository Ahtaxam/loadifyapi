const User = require("../schema/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/jwtKey");

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const { _id } = jwt.verify(token, config.jwtPrivateKey);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.findOne({ _id });

      if (user) {
        await User.findByIdAndUpdate({ _id }, { password: hashPassword });
        res.status(200).json({ message: "Password Updted" });
      }
    } catch (e) {
      res.status(404).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = resetPassword;
