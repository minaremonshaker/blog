import jwt from "jsonwebtoken";
import User from "../db/models/users.model.js";

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer"))
    return res.status(401).json({ success: false, message: "unauthenticated" });
  const token = authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  if(decode.role === 'internal_system') {
    req.isSystemRequest = true;
    return next();
  }
  
  const {id} = decode
  const user = await User.findOne({ _id: id });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthenticated" });
  req.user = user
  next();
};

export default auth;
