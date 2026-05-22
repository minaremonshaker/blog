import { requestsAsyncHandler } from "../utils/asyncHandler.js";

const authorize = (permissions) => {
  return requestsAsyncHandler(async (req, res, next) => {
    const user = await req.user.populate({
      path: "roles",
      select: "_id name permissions",
      populate: { path: "permissions", select: "_id name" },
    });
    console.log(user.roles)

    next();
  });
};

export default authorize;
