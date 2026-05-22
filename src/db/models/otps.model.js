import mongoose from "mongoose"
import otpSchema from '../Schemas/otp.schema.js'


const Otp = mongoose.model('otp', otpSchema)


export default Otp;