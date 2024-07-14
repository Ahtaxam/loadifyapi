const express = require("express");
const {
  updateProfile,
  updateAdminPassword,
} = require("../controller/updateProfile");
const route = express.Router();

route.put("/update", updateProfile);
route.put("/admin/password/update", updateAdminPassword);

module.exports = route;
