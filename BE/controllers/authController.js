const catchAsync = require("../middleware/async");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const EmailService = require("../utils/EmailService");
const Token = require("../models/token");
const Customer = require("../models/customer");
const Times = require("../models/timeAccess");
const Account = require("../models/account");
const Otp = require("../models/OTP");
const otpGenerator = require("otp-generator");

const { findByIdAndUpdate } = require("../models/timeAccess");
const notification = require("../models/notification");

exports.register = catchAsync(async (req, res) => {
  const { name, email, phone, password } = req.body;
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
  await Otp.create({
    accountId: account._id,
    otp: otpcode,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${account.email}`,
    "OTP VERIFICATION",
    `Your OTP code: ${otpcode}`
  );
  res.status(201).json({
    success: true,
    message: "Register successfully !!!",
    data: account,
  });
});
exports.verifyOTP = catchAsync(async (req, res) => {
  const { otp } = req.body;
  const { id } = req.params;
  const checkOtp = await Otp.findOne({ accountId: id });
  if (!checkOtp) {
    throw new ApiError(400, "OTP has expired !");
  } else {
    const isMatch = bcrypt.compareSync(otp, checkOtp.otp);
    if (!isMatch) {
      // different
      throw new ApiError(400, "OTP code is not corrrect !");
    } else {
      // same
      await Account.findByIdAndUpdate(id, { isActive: true });
      const account = await Account.findById(id);
      await checkOtp.remove();

      const token = jwt.sign(
        {
          email: account.email,
          name: account.name,
          role: account.role,
          id: account._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );
      res.json({
        success: true,
        message: "Verify successful!",
        token,
      });
    }
  }
});
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existEmail = await Account.findOne({ email });
  if (!existEmail) {
    throw new ApiError(400, "Email or password is incorrect");
  }
  if (existEmail.isActive === true) {
    const isMatch = bcrypt.compareSync(password, existEmail.password);
    if (!isMatch) {
      const timeAccess = await Times.findOne({ userId: existEmail._id });
      if (!timeAccess) {
        await Times.create({
          userId: existEmail._id,
          times: 1,
        });
        throw new ApiError(400, "Wrong password. You have 6 times more");
      } else {
        if (timeAccess.times === 6) {
          throw new ApiError(400, "Account is disabled for a while");
        } else {
          timeAccess.times += 1;
          await timeAccess.save();
          throw new ApiError(
            400,
            `Wrong password. You have ${6 - timeAccess.times + 1} times more`
          );
        }
      }
    }
    if (isMatch) {
      const timeAccess = await Times.findOne({ userId: existEmail._id });
      if (!timeAccess || timeAccess.times < 6) {
        const token = jwt.sign(
          {
            email: existEmail.email,
            name: existEmail.name,
            role: existEmail.role,
            id: existEmail._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({
          success: true,
          token,
          role: existEmail.role,
        });
      } else {
        throw new ApiError(400, "Account is disabled for a while");
      }
    }
  } else {
    const isOtp = await Otp.findOne({ accountId: existEmail._id });
    if (!isOtp) {
      var otpcode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
      });
      await Otp.create({
        accountId: existEmail._id,
        otp: otpcode,
      });
      console.log(otpcode);
      await EmailService.sendMail(
        process.env.EMAIL,
        `${existEmail.email}`,
        "OTP VERIFICATION",
        `Your OTP code: ${otpcode}`
      );

      res.status(403).json({
        success: false,
        message: "Please verify your account!",
        customerId: existEmail,
      });
    } else {
      var otpcode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
      });
      await Otp.findOneAndRemove({ accountId: existEmail._id });
      await Otp.create({
        accountId: existEmail._id,
        otp: otpcode,
      });
      console.log(otpcode);
      await EmailService.sendMail(
        process.env.EMAIL,
        `${existEmail.email}`,
        "OTP VERIFICATION",
        `Your OTP code: ${otpcode}`
      );
      res.status(403).json({
        success: false,
        message: "Please verify your account!",
        customerId: existEmail,
      });
    }
  }
});
exports.resendOTP = catchAsync(async (req, res) => {
  const { id } = req.params;
  const account = await Account.findById(id);
  if (!account) {
    throw new ApiError(400, "Email or password is incorrect");
  }
  var otpcode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });
  await Otp.findOneAndRemove({ accountId: account._id });
  await Otp.create({
    accountId: account._id,
    otp: otpcode,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${account.email}`,
    "OTP VERIFICATION",
    `Your OTP code: ${otpcode}`
  );
  res.status(200).json({
    success: true,
    message: "Check your mail for OTP code",
  });
});
exports.updatePassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { oldPassword, newPassword } = req.body;
  const existEmail = await Account.findOne({ email: email });
  if (!existEmail) {
    throw new ApiError(400, "Email have no longer exists");
  }
  const isMatch = bcrypt.compareSync(oldPassword, existEmail.password);
  if (!isMatch) {
    throw new ApiError(400, "Old password does not match");
  } else {
    existEmail.password = newPassword;
    existEmail.save();
  }
  res.json({
    success: true,
    message: "Change successfully !",
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { userId, token } = req.query;
  const { newPassword } = req.body;
  const tokenUser = await Token.findOne({ userId });
  const isValid = bcrypt.compareSync(token, tokenUser.token);
  if (!userId || !token || !tokenUser || !isValid) {
    throw new ApiError(400, "Invalid token and id");
  }
  if (!newPassword) {
    throw new ApiError(400, "Please type new password");
  }
  const user = await Account.findById(userId);
  user.password = newPassword;
  const result = await user.save();
  if (result) {
    await tokenUser.remove();
  }
  // await Promise.all([user.save(), tokenUser.remove()]);//ko thực hiện cùng lúc đc
  await EmailService.sendMail(
    process.env.EMAIL,
    user.email,
    "Success Reset password",
    "Your password is successfully reset"
  );
  res.status(200).json({
    success: true,
    message: "Your password is successfully reset !",
  });
});
exports.forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Please enter an email");
  }
  const existEmail = await Account.findOne({ email });
  if (!existEmail) {
    throw new ApiError(400, "Email have no longer exists");
  }

  const tokenReset = crypto.randomBytes(32).toString("hex");
  const salt = bcrypt.genSaltSync();
  const hashToken = bcrypt.hashSync(tokenReset, salt);
  const existToken = await Token.findOne({ userId: existEmail._id });
  if (existToken) {
    existToken.remove();
  }
  await Token.create({
    userId: existEmail._id,
    token: hashToken,
  });
  const link = `${process.env.FRONT_END_URL}:5500/FE/ResetPassword.html?token=${tokenReset}&userId=${existEmail._id}`;
  await EmailService.sendMail(
    process.env.EMAIL,
    email,
    "[Reset password]",
    `Here is the link to reset your password: ${link}`
  );
  res.status(200).json({
    success: true,
    message: "Your link reset have already been sent to your email",
  });
});

exports.home = catchAsync(async (req, res) => {
  res.json({
    success: true,
  });
});
