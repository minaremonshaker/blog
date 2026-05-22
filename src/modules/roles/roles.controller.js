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

const rolesRouter = Router();

rolesRouter.get("/roles", asyncHandlerHelper.requestsAsyncHandler(rolesService.index));
rolesRouter.get("/roles/:id", asyncHandlerHelper.requestsAsyncHandler(rolesService.show));
rolesRouter.post(
  "/roles",
  validation(createRoleValidationSchema),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.store),
);
rolesRouter.patch(
  "/roles/:id",
  validation(updateRoleValidationSchema),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.update),
);
rolesRouter.delete(
  "/roles/:id",
  validation(deleteParamValidation),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.destroy),
);
rolesRouter.post(
  "/roles/:id/permissions",
  validation(assignValidationShema),
  rolesService.assignPermissionsToRole,
);

export default rolesRouter;
