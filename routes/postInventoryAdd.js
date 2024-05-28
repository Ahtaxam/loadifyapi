const express = require('express');
const { postInventoryAdds, fetchAllInventoryAdd, getInventoryById, deleteInventoryAdd } = require('../controller/postInventoryAdd');
const isAuth = require('../middleware/isAuth');
const route = express.Router();
const { upload } = require('../storage/storge');
route.post(
  '/postadd',
  isAuth,
  upload.fields([
    {
      name: 'inventoryPicture',
      maxCount: 4,
    },
  ]),
  postInventoryAdds
);

route.get("/all", fetchAllInventoryAdd);
route.get("/:id", isAuth, getInventoryById);
route.delete("/:id", isAuth, deleteInventoryAdd)

module.exports = route;
