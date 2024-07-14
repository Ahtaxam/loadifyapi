const express = require("express");
const { getTotalRecord } = require("../controller/getRecord");
const route = express.Router();

route.get("/total", getTotalRecord);

module.exports = route;
