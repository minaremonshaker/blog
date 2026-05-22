import mongoose from "mongoose";



const addressSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
      validate: {
        validator: function (value) {
          return mongoose.isValidObjectId(value);
        },
        message: "please enter a valied user",
      },
    },
    apartement_number: {
      type: Number,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  },
);



export default addressSchema
