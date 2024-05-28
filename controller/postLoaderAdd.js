const Joi = require('joi');
const VEHICLEADD = require('../schema/vehicleAdd');

const postTruckLoaderAdds = async (req, res, next) => {
  try {
    const result = validateVehicleAdd(req.body);
    if (result.error) {
      res.status(400).send({ message: result.error.details[0].message });
      return;
    }
    const files = req.files;
    console.log(files);

    if (!files) {
      return res
        .status(400)
        .json({ message: 'ERROR: uploading, file! try again' });
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
      postedBy: req.user._id,
    });
    const doc = await truckAdd.save();
    res.status(200).json({
      message: 'Add Posted Successfully',
      data: doc,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchAllLoaders = async (req, res) => {
  try {
    const loaders = await VEHICLEADD.find({});
    res.status(200).json({
      message: 'loaders fetched successfully',
      data: loaders,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLoaderById = async (req, res) => {
  const { id } = req.params;
  try {
    const loader = await VEHICLEADD.findById({ _id: id });
    if (!loader) {
      res.status(200).json({
        message: 'Invalid Id',
        data: loader,
        status: 402,
      });
      return;
    }
    res.status(200).json({
      message: 'Fetched successfully',
      data: loader,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteLoaderAdd = async (req, res) => {
  const { id } = req.params;
  try {
    const add = await VEHICLEADD.findOne({ _id: id });
    if (!add) {
      res.status(200).json({
        message: 'Invalid Id',
        status: 402,
      });
      return;
    }
    if (add.postedBy.toString() !== req.user._id.toString()) {
      res.status(403).json({
        message: 'UnAuthorized! you can not perform operation',
        status: 403,
      });
      return;
    }
    const loader = await VEHICLEADD.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: 'Deleted successfully',
      data: loader,
      status: 200,
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

module.exports = {
  postTruckLoaderAdds,
  fetchAllLoaders,
  getLoaderById,
  deleteLoaderAdd,
};
