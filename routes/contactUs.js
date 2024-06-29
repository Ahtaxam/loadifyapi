const express = require("express");
const route = express.Router();

const contactMessage = require("../controller/contactUs");

route.post("/", contactMessage);

module.exports = route;
