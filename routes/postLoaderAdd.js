const express = require("express");
const {
  postTruckLoaderAdds,
  fetchAllLoaders,
  getLoaderById,
  deleteLoaderAdd,
  getCurrentUserLoaderAdds,
  getAllLoaders,
  deleteAddForAdmin,
} = require("../controller/postLoaderAdd");
const { canPostLoaderAdd } = require("../middleware/canPostAdd");
const isAuth = require("../middleware/isAuth");
const route = express.Router();
const { upload } = require("../storage/storge");
route.post(
  "/postadd",
  isAuth,
  canPostLoaderAdd,
  upload.fields([
    {
      name: "cnicPicture",
      maxCount: 1,
    },
    {
      name: "licencePicture",
      maxCount: 1,
    },
    {
      name: "vehiclePicture",
      maxCount: 4,
    },
  ]),
  postTruckLoaderAdds
);

route.get("/currentuser", isAuth, getCurrentUserLoaderAdds);
route.get("/all", fetchAllLoaders);
route.get("/getAll", getAllLoaders);
route.get("/:id", getLoaderById);
route.delete("/:id", isAuth, deleteLoaderAdd);
route.delete("/admin/delete/:id", deleteAddForAdmin);
module.exports = route;
