const express = require("express");
const route = express.Router();

const {sendMessage,getMessages} = require("../controller/message");
const isAuth = require("../middleware/isAuth") 

route.post('/send/:id', isAuth, sendMessage);
route.get('/:id', isAuth, getMessages)

module.exports = route