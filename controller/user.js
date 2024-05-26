const USER = require("../schema/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/jwtKey");
const _ = require("lodash");

const createUser = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  const user = await USER.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "Email Already register " });
    return;
  } else {
    let user = new USER({
      ...req.body,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);
    try {
      user = await user.save();
      res.status(201).json({
        message: "user created successfully",
        data: _.pick(user, [
          "_id",
          "firstName",
          "lastName",
          "email",
          "role",
          "address",
        ]),
        token,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const authUser = async (req, res) => {
  try {
    const result = validateLoginData(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    const user = await USER.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (!validate) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);
      res
        .cookie("expressToken", token, {
          expire: 360000 + Date.now(),
          httpOnly: false,
        })
        .status(200)
        .send({
          message: "Login Successsfully...",
          data: _.pick(user, [
            "_id",
            "firstName",
            "lastName",
            "email",
            "role",
            "address",
          ]),
          token: token,
        });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

function validateUser(user) {
  const { firstName, lastName, email, password, role, address, phoneNumber } =
    user;

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  });

  return schema.validate({
    firstName,
    lastName,
    role,
    email,
    password,
    address,
    phoneNumber,
  });
}

function validateLoginData(user) {
  let email = user.email;
  let password = user.password;

  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate({ email, password });
}

module.exports = { createUser, authUser };
