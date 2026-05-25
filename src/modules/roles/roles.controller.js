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

rolesRouter.get("/", auth, asyncHandlerHelper.requestsAsyncHandler(rolesService.index));
rolesRouter.get("/:id", auth, asyncHandlerHelper.requestsAsyncHandler(rolesService.show));
rolesRouter.post(
  "/",
  auth,
  validation(createRoleValidationSchema),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.store),
);
rolesRouter.patch(
  "/:id",
  auth,
  validation(updateRoleValidationSchema),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.update),
);
rolesRouter.delete(
  "/:id",
  auth,
  validation(deleteParamValidation),
  asyncHandlerHelper.requestsAsyncHandler(rolesService.destroy),
);
rolesRouter.post(
  "/:id/permissions",
  auth,
  validation(assignValidationShema),
  rolesService.assignPermissionsToRole,
);

export default rolesRouter;
