import { Router } from "express";
import * as RolePermissionServie from "./roles-permission.service.js";
import Auth from "../../middlewares/auth.middleware.js";
import emailVerfyied from "../../middlewares/emailVerfyied.middlreware.js";
import validation from "../../middlewares/validation.middleware.js";
import { assignValidationSchema, revokeValidationSchema } from "./roles-permission.schema.js";

const RolesPermissionsRouter = Router();

RolesPermissionsRouter.post(
  "/:id/permissions/assign",
  Auth,
  emailVerfyied,
  validation(assignValidationSchema),
  RolePermissionServie.assign,
);

RolesPermissionsRouter.post(
  "/:id/permissions/revoke",
  Auth,
  emailVerfyied,
  validation(revokeValidationSchema),
  RolePermissionServie.revoke,
);

export default RolesPermissionsRouter;
