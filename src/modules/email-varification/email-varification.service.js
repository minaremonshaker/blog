import jwt from "jsonwebtoken";
import User from "../../db/models/users.model.js";
import sendEmail from "../../mails/emailsEmitter.mail.js";

export const verifyEmail = async (req, res, next) => {
  try {
    const {token} = req.params;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    if (user.isVerifyed)
      return res.status(400).json({ success: false, message: "email already verifyed" });
    user.isVerifyed = true;
    await user.save();
    return res.json({ success: true, message: "email verifyed" });
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res
        .status(400)
        .json({ success: false, message: "token expireid please generate another one" });
    next(err);
  }
};

export const re_sendVerifayEmail = (req, res, next) => {
  try {
    const user = req.user;
    if(user.isVerifyed) return res.status(400).json({ success: false, message: "email already verifyed" });
    sendEmail.emit("re-send-verfy-email", user);
    return res.json({sucess: true, message: "verification email sent"})
  } catch (err) {
    next(err);
  }
};
