import Joi from "joi";

export const forgetPasswordValidationSchema = Joi.object({
  email: Joi.string().empty("").required().email().trim().lowercase(),
});

export const resetPasswordValidationSchema = Joi.object({
  email: Joi.string().empty("").required().email().trim().lowercase(),
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
  otp: Joi.string().empty("").required(),
});
