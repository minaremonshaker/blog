import express from "express";
import * as otpService from "../../modules/opt-micro-service/otp.service.js";
import validation from "../../middlewares/validation.middleware.js";
import { otpGenerationValidation, otpVerficationValidation } from "./otp.schema.js";
import * as asyncHandlersHelper from "../../utils/asyncHandler.js";

const otpRouter = express.Router();

otpRouter.post(
  "/otp/generate",
  validation(otpGenerationValidation),
  asyncHandlersHelper.requestsAsyncHandler(otpService.generate),
);
otpRouter.post(
  "/otp/verify",
  validation(otpVerficationValidation),
  asyncHandlersHelper.requestsAsyncHandler(otpService.verfiy),
);

export default otpRouter;
