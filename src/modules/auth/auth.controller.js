import { Router } from "express";
import validation from "../../middlewares/validation.middleware.js";
import { requestsAsyncHandler } from "../../utils/asyncHandler.js";
import * as authService from "../auth/auth.service.js";
import * as schema from "./auth.schema.js";
import Auth from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post(
  "/login",
  validation(schema.loginValidationSchema),
  requestsAsyncHandler(authService.login),
);
authRouter.post(
  "/register",
  validation(schema.registerValidationSchema),
  requestsAsyncHandler(authService.register),
);


export default authRouter;
