// generateToken.js
import jwt from "jsonwebtoken";

// 2. Build a payload representing your backend application
const payload = {
  serviceName: "main-backend-app",
  role: "internal_system", // This distinguishes it from a real user
};

// 3. Generate a token that lasts 10 years so you don't have to keep rotating it
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10y" });

console.log("---------------- COPY THIS TOKEN ----------------");
console.log(`Bearer ${token}`);
console.log("-------------------------------------------------");
