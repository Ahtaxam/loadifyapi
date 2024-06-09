const express = require("express");
const {
  postInventoryAdds,
  fetchAllInventoryAdd,
  getInventoryById,
  deleteInventoryAdd,
  getCurrentUserInventoryAdds,
  shippedInventory,
  getAllActiveInventories,
} = require("../controller/postInventoryAdd");
const { canPostInventoryAdd } = require("../middleware/canPostAdd");
const isAuth = require("../middleware/isAuth");
const route = express.Router();
const { upload } = require("../storage/storge");
route.post(
  "/postadd",
  isAuth,
  canPostInventoryAdd,
  upload.fields([
    {
      name: "inventoryPicture",
      maxCount: 4,
    },
  ]),
  postInventoryAdds
);
route.get("/currentuser", isAuth, getCurrentUserInventoryAdds);
// route.get("/active", isAuth, getAllActiveInventories)
route.get("/all", fetchAllInventoryAdd);
route.get("/:id", getInventoryById);
route.delete("/:id", isAuth, deleteInventoryAdd);
// route.put("/shipped", isAuth, shippedInventory);

module.exports = route;
