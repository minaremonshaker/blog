import Joi from "joi";
import User from "../../db/models/users.model.js";

export const userCreateValidationSchema = Joi.object({
  first_name: Joi.string().empty("").required().trim().lowercase(),
  last_name: Joi.string().empty("").required().trim().lowercase(),
  username: Joi.string().empty("").required().alphanum().min(5).trim().lowercase(),
  email: Joi.string().empty("").required().trim().lowercase().email(),
  password: Joi.string()
    .empty("")
    .required()
    .min(5)
    .max(15)
    .pattern(new RegExp("[a-z]"), "lowercase")
    .pattern(new RegExp("[A-Z]"), "uppercase")
    .pattern(new RegExp("[0-9]"), "number")
    .pattern(new RegExp("[!@#$%^&*]"), "special_character"),
  confirm_password: Joi.string()
    .empty("")
    .required()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "password and confirm password dose not match",
    }),
  apartement_number: Joi.number().required().min(1),
  street: Joi.string().required().trim().lowercase(),
  city: Joi.string().empty().required().trim().lowercase(),
  state: Joi.string().optional().trim().lowercase().allow("").default(""),
  country: Joi.string().empty().required().trim().lowercase(),
});

export const replacevalidatioSchema = userCreateValidationSchema.fork(
  ["confirm_password", "apartement_number", "street", "city", "state", "country"],
  (schema) => schema.forbidden(),
);

export const updateValidationSchema = userCreateValidationSchema
  .fork(["first_name", "last_name", "email", "username", "password"], (schema) =>
    schema.optional().empty(" ").messages({
      "string.empty": "{#label} required",
    }),
  )
  .fork(["confirm_password", "apartement_number", "street", "city", "state", "country"], (schema) =>
    schema.forbidden(),
  )
  .messages({
    "any.empty": "{#label} is required",
    "any.required": "{#label} is required",
  });;

export const searchingValidationSchema = Joi.object({
  search: Joi.string().required(),
  searchBy: Joi.string().trim().replace(/,$/, ""),
  orderBy: Joi.string().trim().replace(/,/gi, " "),
});
