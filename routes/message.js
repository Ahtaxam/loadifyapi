const express = require("express");
const route = express.Router();

const {sendMessage} = require("../controller/message");
const isAuth = require("../middleware/isAuth") 

route.post('/send/:id', isAuth, sendMessage)

module.exports = route