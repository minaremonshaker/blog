import axios from "axios";

export const generateOtp = async (email, purpose, token = null) => {
  try {
    const tokenToUse = token || process.env.INTERNAL_OTP_SERVICE_TOKEN;

    const response = await axios.post(`${process.env.APP_URL}:${process.env.PORT}/otp/generate`, {
      identifier: email,
      purpose,
    },{
      headers :{
        "Authorization": tokenToUse
      }
    })

    return response;
  } catch (err) {
    throw err;
  }
};

export const veriefyOtp = async (email, purpose, otp, token = null) => {
  try {
    const tokenToUse = token || process.env.INTERNAL_OTP_SERVICE_TOKEN;
    const response = await axios.post(
      `${process.env.APP_URL}:${process.env.PORT}/otp/verify`,
      {
        identifier: email,
        purpose,
        otp,
      },
      {
        headers: {
          Authorization: tokenToUse,
        },
      },
    );
    return response;
  } catch (err) {
    throw err;
  }
};
