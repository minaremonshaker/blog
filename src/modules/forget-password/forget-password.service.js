import User from "../../db/models/users.model.js";
import * as otpHelpers from "../../utils/otpHelpers.js";

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ sucess: false, message: "user not found" });
  const generateOtp = await otpHelpers.generateOtp(user.email, "password_reset");
  return res.json({
    success: true,
    message: "email send with one time code, please check your email",
  });
};

export const resetPassword = async (req, res, next) => {
  const { email, password, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ sucess: false, message: "user not found" });
  const veriefyOtp = await otpHelpers.veriefyOtp(email, "password_reset", otp, null);
  user.password = password;
  user.save();
  return res.json({
    success: true,
    message: "password reseted succesfully",
  });
};
