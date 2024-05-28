const express = require("express");
const { postTruckLoaderAdds } = require("../controller/postAdd");
const isAuth = require("../middleware/isAuth");
const route = express.Router();
const { upload } = require("../storage/storge");
route.post(
  "/truck",
  isAuth,
  upload.fields([
    {
      name: "cnicPicture",
      maxCount: 4,
    },
    {
      name: "licencePicture",
      maxCount: 4,
    },
    {
      name: "vehiclePicture",
      maxCount: 10,
    },
  ]),
  postTruckLoaderAdds
);

module.exports = route;
