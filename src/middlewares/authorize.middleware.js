import { requestsAsyncHandler } from "../utils/asyncHandler.js";
import User from "../db/models/users.model.js";
import mongoose from "mongoose";

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
    if (isAdmin && hasAdminManage) {
       return next()
    }

    console.log(permission)
    

    return res.status(401).json({success: false , message: "unauthorized"})

    next()
  });
};

export default authorize;
