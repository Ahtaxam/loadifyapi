const Joi = require('joi');
const mongoose = require('mongoose');
const INVENTORYADD = require('../schema/inventoryAdd');

const postInventoryAdds = async (req, res, next) => {
  try {
    const result = validateInventoryAdd(req.body);
    if (result.error) {
      res.status(400).send({ message: result.error.details[0].message });
      return;
    }
    const file = req.files;

    if (!file) {
      return res
        .status(400)
        .json({ message: 'ERROR: uploading, file! try again' });
    }
    const inventoryPicture = file.inventoryPicture
      ? file.inventoryPicture[0].path
      : null;

    const inventoryAdd = new INVENTORYADD({
      ...req.body,
      inventoryPicture,
      postedBy: req.user._id,
    });
    const doc = await inventoryAdd.save();
    res.status(200).json({
      message: 'Add Posted Successfully',
      data: doc,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchAllInventoryAdd = async (req, res) => {
  try {
    const loaders = await INVENTORYADD.find({});
    res.status(200).json({
      message: 'inventories fetched successfully',
      data: loaders,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await INVENTORYADD.findById({ _id: id });
    if (!inventory) {
      res.status(200).json({
        message: 'Invalid Id',
        data: inventory,
        status: 402,
      });
      return;
    }
    res.status(200).json({
      message: 'Fetched successfully',
      data: inventory,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteInventoryAdd = async (req, res) => {
  const { id } = req.params;
  try {
    const add = await INVENTORYADD.findOne({ _id: id });
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
    const inventory = await INVENTORYADD.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: 'Deleted successfully',
      data: inventory,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCurrentUserInventoryAdds = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);
  try {
    const inventory = await INVENTORYADD.find({ postedBy: userId });
    if (!inventory) {
      res.status(200).json({
        message: 'No Add Posted',
        data: inventory,
        status: 402,
      });
      return;
    }
    res.status(200).json({
      message: 'Fetched successfully',
      data: inventory,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const validateInventoryAdd = (data) => {
  const schema = Joi.object({
    inventorySize: Joi.string().required(),
    inventoryWeight: Joi.string().required(),
    ownerName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    inventoryType: Joi.string().required(),
    countryName: Joi.string().required(),
    stateName: Joi.string().required(),
    city: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  postInventoryAdds,
  fetchAllInventoryAdd,
  getInventoryById,
  deleteInventoryAdd,
  getCurrentUserInventoryAdds,
};
