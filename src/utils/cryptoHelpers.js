import crypto from "crypto";

export const generateNumericOtp = async () => {
  return await crypto.randomInt(100000, 999999).toString();
};
