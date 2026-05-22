import { Router } from "express";
import * as userService from "./users.service.js";
import { requestsAsyncHandler } from "../../utils/asyncHandler.js";
import validation from "../../middlewares/validation.middleware.js";
import * as schema from "./user.schema.js";
import Auth from "../../middlewares/auth.middleware.js";
import emailVerfyied from '../../middlewares/emailVerfyied.middlreware.js'
import authorize from '../../middlewares/authorize.middleware.js'

const userRouter = Router();
userRouter.use(Auth);
userRouter.use(emailVerfyied);
userRouter.get("/",authorize("user:show_all"),requestsAsyncHandler(userService.index));
userRouter.get("/:id", requestsAsyncHandler(userService.show));
userRouter.post("/", validation(schema.userCreateValidationSchema), requestsAsyncHandler(userService.store));
userRouter.put("/:id", validation(schema.replacevalidatioSchema), requestsAsyncHandler(userService.replace));
userRouter.patch(
  "/:id",
  validation(schema.updateValidationSchema),
  requestsAsyncHandler(userService.update),
);
userRouter.delete("/:id", requestsAsyncHandler(userService.destroy));

export default userRouter;
