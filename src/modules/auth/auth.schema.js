import Joi from "joi";

export const loginValidationSchema = Joi.object({
  email: Joi.string().empty("").required(),
  password: Joi.string().empty("").required(),
}).empty("").required();

export const registerValidationSchema = Joi.object({
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
    .messages({
      "any.only": "password and confirm password dose not match",
    }),
})
