import { transporter } from "../transporter.mail.js";
import * as asyncHandlers from "../../utils/asyncHandler.js";
import generateEmailTemplate from "../generateEmailTemplate.mail.js";
import jwt from "jsonwebtoken";

const activateAccountEamil = asyncHandlers.asyncHandler(async (user) => {
  const activationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn:'1m'});
  const activationLink = `${process.env.APP_URL}:${process.env.PORT}/verify/${activationToken}`;
  const emailTemplate = await generateEmailTemplate("activate.template.html", {
    first_name: user.first_name,
    link: activationLink,
  });

  const sendEmail = transporter.sendMail({
    from: `"Blog"<${process.env.EMAIL_USERNAME}>`,
    to: user.email,
    subject: "Account Activation",
    html: emailTemplate,
  });
  return sendEmail;
});

export default activateAccountEamil;
