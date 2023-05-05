const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
const Service = require("../models/service");

// _id.valueOf() --> lấy id từ object id
exports.registerService = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { serviceType, date, requirement, price } = req.body;
  const service = await Service.create({
    serviceType,
    date,
    requirement,
    price,
    companyID: id,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.updateService = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { date, requirement, price, serviceType } = req.body;
  const service = await Service.findOneAndUpdate(
    { serviceType, companyID: id },
    { date, requirement, price },
    { new: true }
  );
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.deleteService = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { serviceType } = req.body;
  const service = await Service.findOneAndDelete({
    serviceType,
    companyID: id,
  });
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.getAllService = catchAsync(async (req, res) => {
  const id = req.user.id;
  const service = await Service.find({ companyID: id });
  if (!service.length) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.getServiceDetail = catchAsync(async (req, res) => {
  const id = req.user.id;
  const service = await Service.findOne({ serviceType, companyID: id });
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.getServiceDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findOne({ serviceType, companyID: id });
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
