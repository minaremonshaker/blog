import { faker } from "@faker-js/faker";
import Permission from "../db/models/permission.model.js";

const permissionSeed = async() => {
  try {
    await Permission.deleteMany({});
    const permissions = [
      {
        name: "user:manage",
      },
      {
        name: "user:update_own",
      },
      {
        name: "user:delete_own"
      },
      {
        name: "user:show_own"
      },
      {
        name: "user:show_all"
      },
      {
        name: "user:create"
      },
      {
        name: "user:update"
      },
      {
        name: "user:replace",
      },
      {
        name: "user:delete"
      }
    ];

    await Permission.insertMany(permissions)

    console.log("permissions collection has been updated")

  } catch (err) {
    console.log(err);
  }
};

export default permissionSeed