import Joi from "joi";

export const queryValidation =  (queryObject, Schema) => {
  try {
    const validated =  Schema.validate(queryObject, {
      abortEarly: false,
      errors: { wrap: { label: false } },
    });
    return validated.value;
  } catch (err) {
      throw err
  }
};
