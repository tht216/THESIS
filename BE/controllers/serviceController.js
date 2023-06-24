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
  const { serviceType, price } = req.body;
  const service = await Service.create({
    serviceType,
    price,
    companyID: id,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.deleteService = catchAsync(async (req, res) => {
  const { id } = req.body;
  const service = await Service.findByIdAndDelete(id);
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
    throw new ApiError(400, "This company hasn't registered service yet");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.getServiceDetail = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { serviceType } = req.body;
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
//____________________________________________________
exports.getServiceDetailByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id).populate({
    path: "companyID",
    populate: { path: "_id", select: "name email phone" },
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
exports.registerServiceAdmin = catchAsync(async (req, res) => {
  const { serviceType, requirement, price, email } = req.body;
  const account = await Account.findOne({ email, role: ROLES.COMPANY });
  console.log(account);
  if (!account) {
    throw new ApiError(400, "This company email is not available");
  }
  const service = await Service.create({
    companyID: account._id,
    serviceType,
    requirement,
    price,
  });
  res.status(201).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const service = await Service.findByIdAndUpdate(id, { price }, { new: true });
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.deleteServiceByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.getAllServiceByAdmin = catchAsync(async (req, res) => {
  const { search, page, sort, sortOrder, pageSize } = req.body;
  const pipeline = [
    {
      $lookup: {
        from: "Company",
        localField: "companyID",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $lookup: {
        from: "Account",
        localField: "company._id",
        foreignField: "_id",
        as: "account",
      },
    },
    {
      $match: {
        $or: [
          { serviceType: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } },
          { "account.name": { $regex: search, $options: "i" } },
          { "account.email": { $regex: search, $options: "i" } },
        ],
      },
    },
    {
      $sort: {
        [sort || "createdAt"]: sortOrder === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (page - 1) * pageSize,
    },
    {
      $limit: pageSize || 5,
    },
  ];
  const data = await Service.aggregate(pipeline);
  const count = await Service.aggregate([
    {
      $lookup: {
        from: "Company",
        localField: "companyID",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $lookup: {
        from: "Account",
        localField: "company._id",
        foreignField: "_id",
        as: "account",
      },
    },
    {
      $match: {
        $or: [
          { serviceType: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } },
          { "account.name": { $regex: search, $options: "i" } },
          { "account.email": { $regex: search, $options: "i" } },
        ],
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    data,
    total: count[0].count || 0,
  });
});
