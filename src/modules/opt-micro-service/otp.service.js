import * as cryptoHelpers from "../../utils/cryptoHelpers.js";
import Otp from "../../db/models/otps.model.js";
import sendEmail from "../../mails/emailsEmitter.mail.js";

export const generate = async (req, res, next) => {
  const { identifier, purpose } = req.body;
  await Otp.deleteMany({});
  const generatedOtp = await cryptoHelpers.generateNumericOtp();
  const createOtp = await Otp.create({ identifier, purpose, otp: generatedOtp });
  sendEmail.emit("send-otp", identifier, purpose, generatedOtp, 5);
  return res.json({ success: true, message: "OTP generated and sent successfully" });
};

export const verfiy = async (req, res, next) => {
  const { identifier, purpose, otp } = req.body;
  const record = await Otp.findOne({ identifier, purpose });
  if (!record)
    return res.status(400).json({ success: false, message: "OTP expired or never requested." });
  if (record.otp !== otp) {
    record.$inc("attempts", 1);
    if (record.attempts >= 3) {
      await record.deleteOne();
      return res
        .status(400)
        .json({ success: false, message: "Too many wrong attempts. Please request a new OTP." });
    }
    await record.save();
    return res.status(400).json({ success: false, message: "Invalid OTP." });
  }
  await record.deleteOne();
  return res.json({ success: true, message: "Otp Verfied" });
};