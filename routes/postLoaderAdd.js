const express = require('express');
const {
  postTruckLoaderAdds,
  fetchAllLoaders,
  getLoaderById,
  deleteLoaderAdd,
} = require('../controller/postLoaderAdd');
const isAuth = require('../middleware/isAuth');
const route = express.Router();
const { upload } = require('../storage/storge');
route.post(
  '/postadd',
  isAuth,
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

route.get('/all', fetchAllLoaders);
route.get('/:id', isAuth, getLoaderById);
route.delete('/:id', isAuth, deleteLoaderAdd);
module.exports = route;
