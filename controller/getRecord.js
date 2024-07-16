const INVENTORYADD = require("../schema/inventoryAdd");
const vehicleAdd = require("../schema/vehicleAdd");
const User = require("../schema/user");
const Booking = require("../schema/booking");

const getTotalRecord = async (req, res) => {
  try {
    const [
      totalInventories,
      totalLoader,
      totalUsers,
      bookedOrder,
      loader,
      inventory,
      loaderCityRatio,
      inventoryCityRatio,
    ] = await Promise.all([
      INVENTORYADD.countDocuments(),
      vehicleAdd.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments(),
      vehicleAdd.aggregate([
        {
          $group: {
            _id: "$stateName",
            count: { $sum: 1 },
          },
        },
      ]),
      INVENTORYADD.aggregate([
        {
          $group: {
            _id: "$stateName",
            count: { $sum: 1 },
          },
        },
      ]),
      vehicleAdd.aggregate([
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
          },
        },
      ]),
      INVENTORYADD.aggregate([
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const registeredLoaders = loader.map((obj) => ({
      label: obj._id,
      value: obj.count,
    }));

    const registeredInventories = inventory.map((obj) => ({
      label: obj._id,
      value: obj.count,
    }));

    const registeredLoadersCityRation = loaderCityRatio.map((obj) => ({
      label: obj._id,
      value: obj.count,
    }));

    const registeredInventoriesCityRation = inventoryCityRatio.map((obj) => ({
      label: obj._id,
      value: obj.count,
    }));

    const totalRecord = {
      inventory: totalInventories,
      loaders: totalLoader,
      users: totalUsers,
      booking: bookedOrder,
      loadersData: registeredLoaders,
      inventoryData: registeredInventories,
      loadersCityratio: registeredLoadersCityRation,
      inventoryCityratio: registeredInventoriesCityRation,
    };

    res.status(200).json({
      message: "Total record fetched successfully",
      data: totalRecord,
      status: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTotalRecord };
