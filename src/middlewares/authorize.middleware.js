import { requestsAsyncHandler } from "../utils/asyncHandler.js";
import User from "../db/models/users.model.js";
import mongoose from "mongoose";

const authorize = (permissions) => {
  return requestsAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await req.user.populate({
      path: "roles",
      select: "_id name permissions",
      populate: { path: "permissions", select: "_id name" },
    });

    const roles = user.roles;
    const perm = roles.flatMap((role) => role.permissions);
    const providedPermissions = permissions;

    if (
      !permissions &&
      perm.some((perm) => {
        return perm.name === "admin:manage";
      })
    ) {
      return next();
    }
    if (
      permissions &&
      perm.some((perm) => providedPermissions.includes(perm.name) && perm.name.endsWith("_own"))
    ) {
      if (user._id.toString() === id) {
        return next();
      }
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    if (permissions && perm.some((perm) => providedPermissions.includes(perm.name))) {
      return next();
    }
    return res.status(403).json({ success: false, message: "Forbidden" });
  });
};

export default authorize;
