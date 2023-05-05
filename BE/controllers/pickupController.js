const catchAsync = require("../middleware/async");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
const Pickup = require("../models/pickup");
const Collection = require("../models/collection");
const { STATUS } = require("../constant");
exports.bookPickup = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { companyId, date, long, lat, address } = req.body;
  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(400, "This company is not available");
  }
  const pickup = await Pickup.create({
    custumerId: id,
    companyId,
    date,
    long,
    lat,
    address,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.deletePickup = catchAsync(async (req, res) => {
  const { pickupId } = req.body;
  const pickup = await Pickup.findById(pickupId);
  if (!pickup) {
    throw new ApiError(400, "This pickup is not available");
  }
  await pickup.remove();
  await Collection.deleteMany({
    pickupId,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.getPickup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Pickup.findById(id);
  const collection = await Collection.find({ pickupID: id });
  if (!data || !collection) {
    throw new ApiError(400, "This pickup is not available");
  }
  res.status(200).json({
    success: true,
    data,
    collection,
  });
});
exports.reportMissedPickup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pickup = await Pickup.findById(id);
  if (!pickup) {
    throw new ApiError(400, "This pickup is not available");
  }
  if(!pickup.status === STATUS.DONE){
    throw new ApiError(400, "This pickup is done");
  }
  await pickup.isMissed === false;
  res.status(200).json({
    success: true,
    message: "Report Successfull",
    pickup,
  });
});
exports.changeStatusPickup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const pickup = await Pickup.findByIdAndUpdate(id, {status});
  if (!pickup) {
    throw new ApiError(400, "This pickup is not available");
  }
  await pickup.isMissed === false;
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
