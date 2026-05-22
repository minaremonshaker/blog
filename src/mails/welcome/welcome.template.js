import { transporter } from "../transporter.mail.js";
import * as asyncHandlers from "../../utils/asyncHandler.js";
import generateEmailTemplate from "../generateEmailTemplate.mail.js";

const welcomeEmail = asyncHandlers.asyncHandler(async (user) => {
  const emailTemplate = await generateEmailTemplate("welcome.template.html", {
     first_name: user.first_name
  });
  const sendEmail = transporter.sendMail({
    from: `"Blog"<${process.env.EMAIL_USERNAME}>`,
    to: user.email,
    subject: "Welcome Blog App",
    html: emailTemplate,
  });
  return sendEmail;
});

export default welcomeEmail;
