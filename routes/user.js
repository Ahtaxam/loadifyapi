const express = require("express");
const {
  createUser,
  authUser,
  getAllUsers,
  deleteUser,
  adminLogin,
} = require("../controller/user");
const route = express.Router();

route.post("/signup", createUser);
route.post("/login", authUser);
route.post("/admin/login", adminLogin);
route.get("/all", getAllUsers);
route.delete("/:id", deleteUser);

module.exports = route;
