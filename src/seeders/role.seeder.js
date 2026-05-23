import Roles from "../db/models/roles.model.js";
import Permission from "../db/models/permission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const roleSeed = asyncHandler(async () => {
  const permissions = await Permission.find({
    name: { $in: ["admin:manage", "user:update_own", "user:show_own", "user:delete_own"] },
  });
  const roleCount = await Roles.countDocuments({});

  const adminPermissions = permissions
    .filter((p) => p.name === "admin:manage")
    .flatMap((v) => v._id);
  const userPermissions = permissions
    .filter((p) => p.name !== "admin:manage")
    .flatMap((v) => v._id);

  if (roleCount === 0) {
    await Roles.insertMany([
      {
        name: "admin",
        permissions: adminPermissions,
      },
      {
        name: "user",
        permissions: userPermissions,
      },
    ]);

    console.log("roles has been initalized");
  }
});

export default roleSeed;
