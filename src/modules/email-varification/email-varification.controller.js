import express from "express";
import * as verifyService from "./email-varification.service.js";
import auth from "../../middlewares/auth.middleware.js";

const virefyEmailRouter = express.Router();

virefyEmailRouter.get("/:token", verifyService.verifyEmail);
virefyEmailRouter.post(
  "/re-send-varifiacation-email",
  auth,
  verifyService.re_sendVerifayEmail,
);

export default virefyEmailRouter;
