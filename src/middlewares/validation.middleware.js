import { requestsAsyncHandler } from "../utils/asyncHandler.js";
const validation = (schema) => {
  return requestsAsyncHandler(async (req, res, next) => {
    const dataToValidate = {...req.body, ...req.query, ...req.params}
    const validated = await schema.validateAsync(dataToValidate || {}, {
      abortEarly: false,
      errors: { wrap: { label: false } },
      messages: {
        "any.required": "{#label} required",
        "any.empty": "{#label} required",
        "string.pattern.name": "Password must contain at least one {#name}",
      },
    });

    
    next();
  });
};

export default validation;
