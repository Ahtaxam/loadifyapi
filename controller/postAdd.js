const Joi = require("joi");
const VEHICLEADD = require("../schema/vehicleAdd");

const postTruckLoaderAdds = async (req, res, next) => {
  try {
    const result = validateVehicleAdd(req.body);
    if (result.error) {
      res.status(400).send({ message: result.error.details[0].message });
      return;
    }
    const files = req.files;

    if (!files) {
      return res
        .status(400)
        .json({ message: "ERROR: uploading, file! try again" });
    }
    const cnicPicture = files.cnicPicture ? files.cnicPicture[0].path : null;
    const licencePicture = files.licencePicture
      ? files.licencePicture[0].path
      : null;
    const vehiclePicture = files.vehiclePicture
      ? files.vehiclePicture.map((file) => file.path)
      : [];

    const truckAdd = new VEHICLEADD({
      ...req.body,
      cnicPicture,
      licencePicture,
      vehiclePicture,
    });
    const doc = await truckAdd.save();
    res.status(200).json({
      message: "Add Posted Successfully",
      data: doc,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const validateVehicleAdd = (data) => {
  const schema = Joi.object({
    vehicleName: Joi.string().required(),
    vehicleModel: Joi.string().required(),
    vehicleNumber: Joi.string().required(),
    ownerName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    ownerCnic: Joi.string().required(),
    licenceNumber: Joi.string().required(),
    countryName: Joi.string().required(),
    stateName: Joi.string().required(),
    city: Joi.string().required(),
    location: Joi.string().required(),
    vehicleType: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { postTruckLoaderAdds };
