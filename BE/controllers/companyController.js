const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
const service = require("../models/service");
const Notification = require("../models/notification");

// _id.valueOf() --> lấy id từ object id
exports.createCompany = catchAsync(async (req, res) => {
  const { name, email, phone, long, lat, address, description } = req.body;
  var password = generator.generateMultiple(1, {
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  })[0];
  const account = await Account.create({
    name,
    email,
    phone,
    password,
    role: ROLES.COMPANY,
  });
  const company = await Company.create({
    _id: account.id,
    long,
    lat,
    address,
    description,
  });
  const notification = await Notification.create({ accountId: account.id });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${email}`,
    "REGISTER COMPANY SUCCESS",
    `Your passwors: ${password}`
  );
  res.status(201).json({
    success: true,
    message: "Successfull",
    account,
    company,
    notification,
  });
});
exports.deleteCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const account = await Account.findById(id);
  const company = await Company.findById(id);
  const notification = await Company.findOne({ accountId: id });
  if (!account || !company) {
    throw new ApiError(400, "This company is not available");
  }
  await account.remove();
  await company.remove();
  await notification.remove();
  await service.deleteMany({ companyID: id });
  res.status(200).json({
    success: true,
    data: account,
  });
});
exports.updateCompanyByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, phone, description, long, lat, address, isActive } = req.body;
  const account = await Account.findByIdAndUpdate(
    id,
    { name, phone, isActive },
    { new: true }
  );
  const company = await Company.findByIdAndUpdate(
    id,
    { long, lat, address, description },
    { new: true }
  );
  if (!account || !company) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    accountInfo: account,
    companyInfo: company,
  });
});
exports.updateCompany = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { name, phone, description } = req.body;
  const account = await Account.findByIdAndUpdate(
    id,
    { name, phone },
    { new: true }
  );
  const company = await Company.findByIdAndUpdate(
    id,
    { description },
    { new: true }
  );
  if (!account || !company) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
exports.getAllCompany = catchAsync(async (req, res) => {
  const { search, page, sort, sortOrder, pageSize } = req.body;
  const pipeline = [
    {
      $lookup: {
        from: "Account",
        localField: "_id",
        foreignField: "_id",
        as: "Account",
      },
    },
    {
      $lookup: {
        from: "Pickup",
        localField: "_id",
        foreignField: "companyId",
        as: "Rating",
      },
    },
    { $set: { current_rating: { $avg: "$Rating.rating" } } },
    {
      $match: {
        $or: [
          { description: { $regex: search, $options: "i" } },
          { long: { $regex: search, $options: "i" } },
          { lat: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { "Account.name": { $regex: search, $options: "i" } },
          { "Account.email": { $regex: search, $options: "i" } },
          { "Account.phone": { $regex: search, $options: "i" } },
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
  const data = await Company.aggregate(pipeline);
  const count = await Company.aggregate([
    {
      $lookup: {
        from: "Account",
        localField: "_id",
        foreignField: "_id",
        as: "Account",
      },
    },

    {
      $match: {
        $or: [
          { description: { $regex: search, $options: "i" } },
          { long: { $regex: search, $options: "i" } },
          { lat: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { "Account.name": { $regex: search, $options: "i" } },
          { "Account.email": { $regex: search, $options: "i" } },
          { "Account.phone": { $regex: search, $options: "i" } },
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
exports.getFilterCompany = catchAsync(async (req, res) => {
  const { serviceType } = req.body;

  const pipeline = [
    {
      $lookup: {
        from: "Account",
        localField: "companyID",
        foreignField: "_id",
        as: "Account",
      },
    },
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
        from: "Pickup",
        localField: "companyID",
        foreignField: "companyId",
        as: "Rating",
      },
    },
    { $set: { current_rating: { $round: [{ $avg: "$Rating.rating" }, 1] } } },
    {
      $set: {
        review: {
          $round: [
            {
              $divide: [{ $sum: "$Rating.rating" }, { $avg: "$Rating.rating" }],
            },
            0,
          ],
        },
      },
    },

    {
      $match: { serviceType },
    },
    {
      $project: {
        companyID: 1,
        current_rating: 1,
        price: 1,
        name: "$Account.name",
        email: "$Account.email",
        phone: "$Account.phone",
        description: "$company.description",
        long: "$company.long",
        lat: "$company.lat",
        address: "$company.address",
        review: 1,
      },
    },
  ];
  const company = await service.aggregate(pipeline);
  if (!company) {
    throw new ApiError(400, "There is no company");
  }

  res.status(200).json({
    success: true,
    company,
  });
});
exports.getCompanyDetailByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Company.findById(id).populate("_id");
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getCompanyDetails = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await Company.findById(id).populate({
    path: "_id",
    select: "name email phone",
  });
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }

  res.status(200).json({
    success: true,
    data,
  });
});
