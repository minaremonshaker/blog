import Joi from "joi";
import * as customValidator from "../../utils/customValidator.js";

const feilds = {
  id: Joi.string().empty("").required().custom(customValidator.objectIdValidation),
  permissions: Joi.array()
    .items(Joi.string().custom(customValidator.objectIdValidation))
    .min(1)
    .required(),
}


export const assignValidationSchema = Joi.object(feilds);

export const revokeValidationSchema = Joi.object(feilds) 