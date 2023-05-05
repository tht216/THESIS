const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Customer = require("../models/customer");
const { ROLES } = require("../constant");
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
  const { name, phone } = req.body;
  const account = await Account.findByIdAndUpdate(id, { name, phone }, { new: true });
  if (!account) {
    throw new ApiError(400, "This customer is not available");
  }
  res
    .status(200)
    .json({ success: true, message: "Update successfully", data: account });
});
exports.getAllCustomer = catchAsync(async (req, res) => {
  const data = await Account.find({ role: ROLES.CUSTOMER });
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Account.findById(id);
  console.log(!data);
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
  res.status(200).json({
    success: true,
    data,
  });
});
