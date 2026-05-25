import authRouter from "../src/modules/auth/auth.controller.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware.js";
import userRouter from "./modules/users/users.controller.js";
import verifyEmail from "./modules/email-varification/email-varification.controller.js";
import otpMicroService from "./modules/opt-micro-service/otp.controller.js";
import resetPassword from "./modules/forget-password/forget-password.controller.js";
import rolesRouter from "./modules/roles/roles.controller.js";
import postRouter from "./modules/posts/posts.controller.js";
import rolePermissionController from './modules/roles-permission/roles-permission.controller.js'

const bootstrap = async (app, express) => {
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/otp", otpMicroService);
  app.use("/verify", verifyEmail);
  app.use("", resetPassword);
  app.use("/roles", rolesRouter);
  app.use('/role' ,rolePermissionController)
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use(globalErrorHandler);
};

export default bootstrap;
