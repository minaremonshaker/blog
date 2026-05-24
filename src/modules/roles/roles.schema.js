import Joi from "joi";
import mongoose from "mongoose";

const validateObjectId = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.message("please add a vaild object id");
  }
  return value;
};

export const createRoleValidationSchema = Joi.object({
  name: Joi.string().empty("").required(),
  description: Joi.string().optional().default(""),
});

export const updateRoleValidationSchema = createRoleValidationSchema
  .append({
    id: Joi.string()
      .required()
      .custom(validateObjectId),
  })
  .fork(["name", "description"], (schema) => {
    return schema.empty(" ").optional();
  });

export const deleteParamValidation = Joi.object({
  id: Joi.string().required().custom(validateObjectId),
});

export const assignValidationShema = Joi.object({
  id: Joi.string().empty("").required().custom(validateObjectId),
  permissions: Joi.array().items(Joi.string().empty("").required().custom(validateObjectId))
})


