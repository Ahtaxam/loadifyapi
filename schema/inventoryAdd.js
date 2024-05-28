const mongoose = require('mongoose');

const inventoryAddSchema = new mongoose.Schema({
  inventorySize: {
    type: String,
    required: true,
  },
  inventoryWeight: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  inventoryType: {
    type: String,
    required: true,
  },
  inventoryPicture: [
    {
      type: String,
      required: true,
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const inventoryAddModel = new mongoose.model(
  'InventoryAdd',
  inventoryAddSchema
);
module.exports = inventoryAddModel;
