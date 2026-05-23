import mongoose from "mongoose";
import userSchema from "../Schemas/users.schema.js";
import { queryValidation } from "../../utils/queryValidation.js";
import { searchingValidationSchema } from "../../modules/users/user.schema.js";
import bcrypt from "bcryptjs";
import feildsMapping from "../../utils/feildsMapping.js";
import * as StringHelpers from "../../utils/stringHelpers.js";
import mongoosePaginate from "mongoose-paginate-v2";
import Roles from "./roles.model.js";

const allowedFeilds = ["first_name", "last_name", "email", "username"];

userSchema.plugin(mongoosePaginate);

userSchema.virtual("addresses", {
  ref: "addresses",
  localField: "_id",
  foreignField: "user_id",
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (err) {
    throw error;
  }
});

userSchema.pre("save",  async function () {
  if (!this.isModified("roles")) {
    const userRole = await Roles.findOne({name:"user"})
    this.roles = this.roles.push(userRole._id);
  }
});

userSchema.statics.smartPaginate = function (query) {
  const { search, searchBy, orderBy, includes, page = 1, limit = 10 } = query;

  const filterObject = {};

  if (search && !searchBy) {
    filterObject.$or = feildsMapping(allowedFeilds, search);
  } else if (search && searchBy) {
    const convertToArray = StringHelpers.trimmingAndConvertToArray(searchBy);
    filterObject.$or = feildsMapping(convertToArray, search);
  }

  const options = {
    docs: "users",
    page: parseInt(page),
    limit: parseInt(limit),
    sort: orderBy ? StringHelpers.replaceCommasWithSpaces(orderBy) : "-createdAt",
    populate: includes ? StringHelpers.trimmingAndConvertToArray(includes) : [],
  };

  return this.paginate(filterObject, options);
};



const User = mongoose.model("users", userSchema);

export default User;
