const catchAsync = require("../middleware/async");
const ApiError = require("../utils/ApiError");
const Notification = require("../models/notification");
exports.getNotification = catchAsync(async (req, res) => {
  const id = req.user.id;
  const notification = await Notification.findOne({ accountId: id });
  if (!notification) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    notification,
  });
});
exports.resetNotification = catchAsync(async (req, res) => {
  const id = req.user.id;
  const notification = await Notification.findOneAndUpdate(
    { accountId: id },
    { number: 0 },
    { new: true }
  );
  if (!notification) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    notification,
  });
});
