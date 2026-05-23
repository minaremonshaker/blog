import User from "../db/models/users.model.js";
import Roles from "../db/models/roles.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const admin = asyncHandler(async () => {
  const hasAdmin = await User.findOne({ username: "admin" });

  if (!hasAdmin) {
    const adminRoles = await Roles.findOne({ name: "admin" });
    

    const createAdmin = await User.create({
      first_name: "admin",
      last_name: "admin",
      username: "admin",
      email: "admin@blog.com",
      password: "Hecaro1986@",
      isVerifyed: true,
      roles: [adminRoles._id],
    });

    console.log("admin user created");
  }
});

export default admin;
