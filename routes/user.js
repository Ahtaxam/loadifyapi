const express = require("express");
const { createUser, authUser } = require("../controller/user");
const route = express.Router();

route.post("/signup", createUser);
route.post("/login", authUser);

module.exports = route;
