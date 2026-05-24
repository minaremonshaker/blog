import { Router } from "express";
import * as rolesService from "../roles/roles.service.js";
import * as asyncHandlerHelper from "../../utils/asyncHandler.js";
import validation from "../../middlewares/validation.middleware.js";
import {
  createRoleValidationSchema,
  updateRoleValidationSchema,
  deleteParamValidation,
  assignValidationShema,
} from "./roles.schema.js";
import authorize from "../../middlewares/authorize.middleware.js";
import auth from "../../middlewares/auth.middleware.js";

const rolesRouter = Router();

rolesRouter.get(
  "/roles",
  auth,
  asyncHandlerHelper.requestsAsyncHandler(rolesService.index),
);
rolesRouter.get(
  "/roles/:id",
  auth,
  asyncHandlerHelper.requestsAsyncHandler(rolesService.show),
);
rolesRouter.post(
  "/roles",
  auth,
  validation(createRoleValidationSchema),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.store),
);
rolesRouter.patch(
  "/roles/:id",
  auth,
  validation(updateRoleValidationSchema),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.update),
);
rolesRouter.delete(
  "/roles/:id",
  auth,
  validation(deleteParamValidation),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.destroy),
);
rolesRouter.post(
  "/roles/:id/permissions",
  auth,
  validation(assignValidationShema),
  rolesService.assignPermissionsToRole,
);

export default rolesRouter;
