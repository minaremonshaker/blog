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
          type: mongoose.Schema.Types.ObjectId,
          ref: "permissions",
          validate: {
            validator: async function (value) {
              const permissionExists = await Permission.exists({ _id: value });
              return !!permissionExists;
            },
            message: (props) => `The permission ID ${props.value} does not exist in the database!`,
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

export default rulesSchema;
