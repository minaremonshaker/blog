import mongoose from "mongoose";

const purpose = {
  register: "registration",
  password_reset: "password_reset",
};

const otpSchema = mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    index: true,
  },
  purpose: {
    type: String,
    required: true,
    enum: Object.values(purpose),
  },
  otp: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m",
  },
});

export default otpSchema;
