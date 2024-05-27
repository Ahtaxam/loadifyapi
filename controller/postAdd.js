const postTruckLoaderAdds = async (req, res, next) => {
  const files = req.files;
  if (!files) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }
  const cnicPicture = files.cnicPicture ? files.cnicPicture[0].path : null;
  const licencePicture = files.licencePicture
    ? files.licencePicture[0].path
    : null;
  const vehiclePicture = files.vehiclePicture
    ? files.vehiclePicture.map((file) => file.path)
    : [];

  res.json({ ...req.body, cnicPicture, licencePicture, vehiclePicture });
};

module.exports = { postTruckLoaderAdds };
