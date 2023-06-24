const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Customer = require("../models/customer");
const { ROLES } = require("../constant");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const otpGenerator = require("otp-generator");
const notification = require("../models/notification");
const OTP = require("../models/OTP");
const EmailService = require("../utils/EmailService");

exports.deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const account = await Account.findById(id);
  const customer = await Customer.findById(id);
  if (!account || !customer) {
    throw new ApiError(400, "This customer is not available");
  }
  await account.remove();
  await customer.remove();
  res.status(200).json({
    success: true,
    data: account,
  });
});
exports.updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, phone, isActive, point } = req.body;
  const account = await Account.findByIdAndUpdate(
    id,
    { name, phone, isActive },
    { new: true }
  );
  const customer = await Customer.findByIdAndUpdate(
    id,
    { point },
    { new: true }
  );
  if (!account && !customer) {
    throw new ApiError(400, "This customer is not available");
  }
  res
    .status(200)
    .json({ success: true, message: "Update successfully", data: account });
});
exports.getAllCustomer = catchAsync(async (req, res) => {
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
      $match: {
        $or: [
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

  const data = await Customer.aggregate(pipeline);
  const count = await Customer.aggregate([
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
exports.getCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Customer.findById(id).populate("_id");
  if (!data) {
    throw new ApiError(400, "This costumer is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getCustomerDetails = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await Account.findById(id);
  if (!data) {
    throw new ApiError(400, "This customer is not available");
  }
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new ApiError(400, "This customer is not available");
  }
  res.status(200).json({
    success: true,
    data: { data, point: customer.point },
  });
});
exports.updateCustomerDetail = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { name, phone } = req.body;
  const account = await Account.findByIdAndUpdate(
    id,
    { name, phone },
    { new: true }
  );
  if (!account) {
    throw new ApiError(400, "This customer is not available");
  }
  res
    .status(200)
    .json({ success: true, message: "Update successfully", data: account });
});
exports.createCustomer = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
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
  });

  var otpcode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });
  await Customer.create({ _id: account._id });
  await notification.create({ accountId: account._id });
  await OTP.create({
    accountId: account._id,
    otp: otpcode,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${account.email}`,
    "OTP VERIFICATION",
    `Your initial password: ${password} \n Your OTP code: ${otpcode}.`
  );
  res.status(201).json({
    success: true,
    message: "Create new customer successfully !!!",
    data: account,
  });
});
