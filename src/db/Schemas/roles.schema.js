
import mongoose from "mongoose";



const schemaOptions = {
  timestamps: true,
};

const rulesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: true,
    },
    permissions: {
      type: [
        {
          type: String,
          ref: "permissions",
        },
      ],
      default: [],
      validate: {
        validator: async function(value) {
          const count = await mongoose.model('permissions').countDocuments({_id : {$in: value}})
          return count === value.length;
        },
        message: props => `One or more permission IDs in [${props.value}] do not exist!`
      }
    },
    description: {
      type: String,
      default: "",
    },
  },
  schemaOptions,
);


export default rulesSchema