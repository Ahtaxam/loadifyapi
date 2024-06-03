const VEHICLEADD = require('../schema/vehicleAdd');
const INVENTORYADD = require('../schema/inventoryAdd');
const canPostLoaderAdd = async (req, res, next) => {
  const postedAdds = await VEHICLEADD.find({ postedBy: req.user._id });
  if (postedAdds.length >= 1) {
    res.status(400).json({
      message: "You can't post more than 1 adds",
      status: 400,
    });
    return;
  }
  next();
};

const canPostInventoryAdd = async (req, res, next) => {
  const postedAdds = await INVENTORYADD.find({ postedBy: req.user._id });
  if (postedAdds.length >= 3) {
    res.status(400).json({
      message: "You can't post more than 3 adds",
      status: 400,
    });
    return;
  }
  next()
};

module.exports = { canPostLoaderAdd, canPostInventoryAdd };
