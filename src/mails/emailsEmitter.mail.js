import EventEmitter from "node:events";
import welcomeEmail from "./welcome/welcome.template.js";
import activateAccoutEmail from "./activate/activate.template.js";
import sendOtpEmail from './otp/opt.template.js'

const MailEmmiters = new EventEmitter();

MailEmmiters.on("register", async (user) => {
  await welcomeEmail(user);
  await activateAccoutEmail(user);
});

MailEmmiters.on("re-send-verfy-email", async (user) => {
  await activateAccoutEmail(user);
});

MailEmmiters.on("send-otp", async (email, purpose, otp) => {
  await sendOtpEmail(email, purpose, otp);
});

export default MailEmmiters;
