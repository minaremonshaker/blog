import { Router } from "express";
import * as resetPasswordService from "./forget-password.service.js";
import validation from "../../middlewares/validation.middleware.js";
import { requestsAsyncHandler } from "../../utils/asyncHandler.js";
import * as schema from "./forget-password.schema.js";

const resetPasswordRouter = Router();

resetPasswordRouter.post(
  "/forget-password",
  validation(schema.forgetPasswordValidationSchema),
  requestsAsyncHandler(resetPasswordService.forgetPassword),
);
resetPasswordRouter.post(
  "/reset-password",
  validation(schema.resetPasswordValidationSchema),
  requestsAsyncHandler(resetPasswordService.resetPassword),
);

export default resetPasswordRouter;
