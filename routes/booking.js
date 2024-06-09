const express = require("express");
const route = express.Router();

const isAuth = require("../middleware/isAuth");
const {
  shippedInventory,
  getAllActiveInventories,
  getAllLoaderOrder,
} = require("../controller/booking");

route.put("/shipped", isAuth, shippedInventory);
route.get("/active", isAuth, getAllActiveInventories);
// route.get("/loaderorder", isAuth, getAllLoaderOrder);

module.exports = route;
