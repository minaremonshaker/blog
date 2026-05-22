import mongoose from "mongoose";
import addressSchema from "../Schemas/addresss.schema.js";


const Address = mongoose.model('addresses', addressSchema )

export default Address;