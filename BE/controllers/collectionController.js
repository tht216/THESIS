const catchAsync = require("../middleware/async");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
const Pickup = require("../models/pickup");
const Collection = require("../models/collection");
exports.selectCollection = catchAsync(async (req, res) => {
  const { amount, serviceType, pickupID } = req.body;
  const pickup = await Pickup.findById(pickupID);
  if (!pickup) {
    throw new ApiError(400, "This pickup is not available");
  }
  const collection = await Collection.create({
    amount,
    serviceType,
    pickupID,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    collection,
  });
});
