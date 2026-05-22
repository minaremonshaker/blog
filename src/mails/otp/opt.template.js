import { transporter } from "../transporter.mail.js";
import * as asyncHandlers from "../../utils/asyncHandler.js";
import generateEmailTemplate from "../generateEmailTemplate.mail.js";

const sendOtp = asyncHandlers.asyncHandler(async (email, purpose, otp, expires) => {
  const emailTemplate = await generateEmailTemplate("otp.template.html", {
    email,
    purpose,
    otp,
    expires,
  });
  const sendEmail = transporter.sendMail({
    from: `"Blog"<${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: `${purpose.toUpperCase()}-OTP`,
    html: emailTemplate,
  });
  return sendEmail;
});

export default sendOtp;
