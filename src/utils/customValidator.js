import mongoose from "mongoose";

export const objectIdValidation = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.message("please add a vaild object id");
  }
  return value;
};
