

import Joi from 'joi'


export const otpGenerationValidation = Joi.object({
  identifier: Joi.string().empty("").required(),
  purpose: Joi.string().empty("").required()
});

export const otpVerficationValidation = Joi.object({
  identifier: Joi.string().empty("").required(),
  purpose: Joi.string().empty("").required(),
  otp: Joi.string().empty("").required()
});
