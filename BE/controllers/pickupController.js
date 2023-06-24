const catchAsync = require("../middleware/async");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
const Pickup = require("../models/pickup");
const { STATUS } = require("../constant");
const { default: mongoose } = require("mongoose");
const notification = require("../models/notification");
const socket = require("../models/socket");
const path = require("path");
exports.bookPickup = catchAsync(async (req, res) => {
  const id = req.user.id;
  var io = req.app.get("socketio");
  const { companyId, long, lat, address, note, price, amount, serviceType } =
    req.body;
  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(400, "This company is not available");
  }
  const pickup = await Pickup.create({
    customerId: id,
    companyId,
    long,
    lat,
    address,
    note,
    serviceType,
    price,
    amount,
  });
  const companyNotification = await notification.findOneAndUpdate(
    { accountId: companyId },
    { $inc: { number: 1 } },
    { new: true }
  );
  if (!companyNotification) {
    await notification.create({ accountId: companyId, number: 1 });
  }
  const socketDevice = await socket.findOne({ accountId: companyId });
  io.to(socketDevice?.socketID).emit("notification-count", 1);
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.ratingPickup = catchAsync(async (req, res) => {
  const { id, rating } = req.body;
  const pickup = await Pickup.findByIdAndUpdate(
    id,
    {
      rating,
    },
    { new: true }
  );
  if (!pickup) {
    throw new ApiError(400, "This pickup is not valid");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.getPickupDetail = catchAsync(async (req, res) => {
  const id = req.user.id;
  const pickup = await Pickup.find({ customerId: id }).populate({
    path: "companyId",
    select: "_id",
    populate: { path: "_id", select: "name " },
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.getPickupDetailCompany = catchAsync(async (req, res) => {
  const id = req.user.id;
  const pickup = await Pickup.find({ companyId: id }).populate({
    path: "customerId",
    select: "_id",
    populate: { path: "_id", select: "name phone" },
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.getPickupByMonthCompany = catchAsync(async (req, res) => {
  const id = req.user.id;
  const pickup = await Pickup.aggregate([
    {
      $match: {
        companyId: mongoose.Types.ObjectId(id),
        createdAt: {
          $gte: new Date(2023, 0, 1),
          $lt: new Date(2023 + 1, 0, 1),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]).sort({ _id: "asc" });
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.getPickupByServiceCompany = catchAsync(async (req, res) => {
  const id = req.user.id;
  const pickup = await Pickup.aggregate([
    {
      $match: {
        companyId: mongoose.Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: "$serviceType",
        total: { $sum: "$amount" },
      },
    },
  ]).sort({ total: "asc" });
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
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
exports.getPickup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Pickup.findById(id).populate({
    path: "customerId",
    populate: { path: "_id"},
  });
  if (!data) {
    throw new ApiError(400, "This pickup is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.reportMissedPickup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pickup = await Pickup.findById(id);
  if (!pickup) {
    throw new ApiError(400, "This pickup is not available");
  }
  if (!pickup.status === STATUS.DONE) {
    throw new ApiError(400, "This pickup is done");
  }
  (await pickup.isMissed) === false;
  await pickup.save();
  res.status(200).json({
    success: true,
    message: "Report Successfull",
    pickup,
  });
});
exports.changeStatusPickup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const pickup = await Pickup.findByIdAndUpdate(id, { status }, { new: true });
  if (!pickup) {
    throw new ApiError(400, "This pickup is not available");
  }
  (await pickup.isMissed) === false;
  await pickup.save();
  res.status(200).json({
    success: true,
    message: "Successfull",
    pickup,
  });
});
