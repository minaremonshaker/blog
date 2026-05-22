import Mailer from "nodemailer";
import * as asyncHandlers from "../utils/asyncHandler.js";

const newTransporter = Mailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const RunEmailServer = asyncHandlers.asyncHandler(async () => {
  await newTransporter.verify();
  console.log("mailer server is connected");
  transporter = newTransporter;
});

export let transporter = newTransporter