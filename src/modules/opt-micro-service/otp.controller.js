import express from "express";
import * as otpService from "../../modules/opt-micro-service/otp.service.js";
import validation from "../../middlewares/validation.middleware.js";
import { otpGenerationValidation, otpVerficationValidation } from "./otp.schema.js";
import * as asyncHandlersHelper from "../../utils/asyncHandler.js";
import authorize from '../../middlewares/authorize.middleware.js'
import Auth from "../../middlewares/auth.middleware.js";

const otpRouter = express.Router();

otpRouter.post(
  "/generate",
  Auth,
  validation(otpGenerationValidation),
  asyncHandlersHelper.requestsAsyncHandler(otpService.generate),
);
otpRouter.post(
  "/verify",
  Auth,
  validation(otpVerficationValidation),
  asyncHandlersHelper.requestsAsyncHandler(otpService.verfiy),
);

export default otpRouter;
