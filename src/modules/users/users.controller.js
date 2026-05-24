import { Router } from "express";
import * as userService from "./users.service.js";
import { requestsAsyncHandler } from "../../utils/asyncHandler.js";
import validation from "../../middlewares/validation.middleware.js";
import * as schema from "./user.schema.js";
import Auth from "../../middlewares/auth.middleware.js";
import emailVerfyied from "../../middlewares/emailVerfyied.middlreware.js";
import authorize from "../../middlewares/authorize.middleware.js";

const userRouter = Router({ mergeParams: true });
userRouter.get(
  "/",
  Auth,
  emailVerfyied,
  authorize(),
  requestsAsyncHandler(userService.index),
);

userRouter.post(
  "/",
  Auth,
  emailVerfyied,
  validation(schema.userCreateValidationSchema),
  requestsAsyncHandler(userService.store),
);
userRouter.get(
  "/:id",
  Auth,
  emailVerfyied,
  authorize(["user:show_own"]),
  requestsAsyncHandler(userService.show),
);

userRouter.put(
  "/:id",
  Auth,
  emailVerfyied,
  validation(schema.replacevalidatioSchema),
  requestsAsyncHandler(userService.replace),
);
userRouter.patch(
  "/:id",
  Auth,
  emailVerfyied,
  validation(schema.updateValidationSchema),
  requestsAsyncHandler(userService.update),
);
userRouter.delete(
  "/:id",
  Auth,
  emailVerfyied,
  requestsAsyncHandler(userService.destroy),
);
userRouter.post(
  "/:id/assign/role",
  Auth,
  emailVerfyied,
  validation(schema.assignRoleToUserValidatonSchema),
  requestsAsyncHandler(userService.assignRoleToUser),
);

export default userRouter;
