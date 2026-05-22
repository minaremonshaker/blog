
import mongoose from "mongoose";
import permissionSchema from '../Schemas/permissions.schema.js'


const Permission = mongoose.model("permissions", permissionSchema);

export default Permission;