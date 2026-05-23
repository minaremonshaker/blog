import { requestsAsyncHandler } from "../utils/asyncHandler.js";
import User from "../db/models/users.model.js";

const authorize = (permission) => {
  return requestsAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await req.user.populate({
      path: "roles",
      select: "_id name permissions",
      populate: { path: "permissions", select: "_id name" },
    });
    const permissions = user.roles.flatMap((role) => role.permissions);
    const isAdmin = user.roles.some((role) => role.name === "admin");
    const hasAdminManage = permissions.some((permission) => permission.name === "admin:manage");
    if (isAdmin && hasAdminManage) return next();
    if (permission.some((permission) => permission.endsWith("_own")) && req.user._id == id)
      return next();
    return res.status(401).json({ success: false, message: "unauthorized" });
  });
};

export default authorize;
