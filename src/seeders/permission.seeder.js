import Permission from "../db/models/permission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const permissions = [
  {
    name: "admin:manage",
  },
  {
    name: "user:update_own",
  },
  {
    name: "user:delete_own",
  },
  {
    name: "user:show_own",
  },
  {
    name: "user:show_all",
  },
  {
    name: "user:create",
  },
  {
    name: "user:update",
  },
  {
    name: "user:replace",
  },
  {
    name: "user:delete",
  },
];

const permissionSeed = asyncHandler(async () => {
  const permissionCount = await Permission.countDocuments({});
  if (permissionCount === 0) {
    await Permission.deleteMany({});
    const addedPermissions = await Permission.insertMany(permissions);
    console.log("permissions has been initalized");
  }
});

export default permissionSeed;
