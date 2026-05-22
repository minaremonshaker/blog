import mongoose from "mongoose";

const schemaOptions = {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
    virtuals: true,
  },
};

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    username: {
      type: String,
      required: true,
      maxLength: 15,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxLength: 255,
      unique: true,
    },
    isVerifyed: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [{ type: mongoose.Types.ObjectId, ref: "roles" }],
      default: [],
    },
    password: {
      type: String,
      select: false,
      required: true,
      maxLength: 255,
    },
  },
  schemaOptions,
);

export default userSchema;
