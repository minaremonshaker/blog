import mongoose from "mongoose";


const schemaOptions = {
  timestamps: true,
};

const permissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    }
}, schemaOptions)

export default permissionSchema