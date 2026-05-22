import Roles from "../db/models/roles.model.js";

const roleSeed = async () => {
  await Roles.deleteMany({});
  const roles = [
    {
      name: "admin",
    },
    {
      name: "user",
    },
  ];

  await Roles.insertMany(roles)
};

export default roleSeed