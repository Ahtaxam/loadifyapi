const INVENTORYADD = require("../schema/inventoryAdd");
const vehicleAdd = require("../schema/vehicleAdd");
const User = require("../schema/user");
const Booking = require("../schema/booking");

const getTotalRecord = async (req, res) => {
  try {
    const totalInventories = await INVENTORYADD.countDocuments();
    const totalLoader = await vehicleAdd.countDocuments();
    const totalusers = await User.countDocuments();
    const bookedOrder = await Booking.countDocuments();

    // get loaders stateName and their ratio
    const loader = await vehicleAdd.aggregate([
      {
        $group: {
          _id: "$stateName",
          count: { $sum: 1 },
        },
      },
    ]);

    const registeredLoaders = loader.map((obj) => {
      return {
        label: obj._id,
        value: obj.count,
      };
    });

    // get registered inventories and their ratio
    const inventory = await INVENTORYADD.aggregate([
      {
        $group: {
          _id: "$stateName",
          count: { $sum: 1 },
        },
      },
    ]);

    const registeredInventories = inventory.map((obj) => {
      return {
        label: obj._id,
        value: obj.count,
      };
    });

    // get loaders city ratio
    const loaderCityRatio = await vehicleAdd.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
    ]);

    const registeredLoadersCityRation = loaderCityRatio.map((obj) => {
      return {
        label: obj._id,
        value: obj.count,
      };
    });

    // get inventory city ratio
    const inventoryCityRatio = await INVENTORYADD.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
    ]);

    const registeredInventoriesCityRation = inventoryCityRatio.map((obj) => {
      return {
        label: obj._id,
        value: obj.count,
      };
    });

    const totalRecord = {
      inventory: totalInventories,
      loaders: totalLoader,
      users: totalusers,
      booking: bookedOrder,
      loadersData: registeredLoaders,
      inventoryData: registeredInventories,
      loadersCityratio: registeredLoadersCityRation,
      inventoryCityratio: registeredInventoriesCityRation,
    };

    res.status(200).json({
      message: "total record fetched successfully",
      data: totalRecord,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTotalRecord };
