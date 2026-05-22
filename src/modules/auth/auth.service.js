import User from "../../db/models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../../mails/emailsEmitter.mail.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  if (!user)
    return res.status(404).json({ sucess: false, message: "user not found"});
  const passwordMatched = bcrypt.compareSync(password, user.password);
  if (!passwordMatched)
    return res.status(401).json({ sucess: false, message: "invalied credintials" });
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  if (!user.isVerifyed)
    return res.status(401).json({
      success: true,
      message: "user signed in succefully, but account not activted",
      data: { token, isVerifyed: false },
    });
  return res.json({ success: true, message: "user signed in succefully", data: { token } });
};

export const register = async (req, res, next) => {
  const { first_name, last_name, email, username, password } = req.body;
  const registerUser = await User.create({ first_name, last_name, email, username, password });
  sendEmail.emit("register", registerUser);
  return res.json({ success: true, message: "user registed succefully", data: registerUser });
};

