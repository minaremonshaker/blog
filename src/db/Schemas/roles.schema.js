
import mongoose from "mongoose";
import Permission from "../models/permission.model.js";

const schemaOptions = {
  timestamps: true,
};

const rulesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    permissions: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "permissions",
          validate: {
            validator: function (value) {
              console.log(value);
              return false;
            },
          },
        },
      ],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
  },
  schemaOptions,
);


export default rulesSchema