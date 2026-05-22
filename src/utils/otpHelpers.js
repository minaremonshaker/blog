import axios from "axios";

export const generateOtp = async (email, purpose) => {
  try {
    const response = await axios.post(`${process.env.APP_URL}:${process.env.PORT}/otp/generate`, {
      identifier: email,
      purpose,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const veriefyOtp = async (email, purpose, otp) => {
  try {
    const response = await axios.post(`${process.env.APP_URL}:${process.env.PORT}/otp/verify`, {
      identifier: email,
      purpose,
      otp,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
