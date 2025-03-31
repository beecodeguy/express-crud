import jwt from "jsonwebtoken";
import { jwtSecret } from "../index.js";
const user = {
  id: 3,
  name: "John",
  role: "employee",
  department: "IT",
  accessLevel: 1,
};

const token = jwt.sign(user, jwtSecret, {
  expiresIn: "1h",
});

console.log("Generated Token:", token);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4iLCJkZXBhcnRtZW50IjoiSVQiLCJhY2Nlc3NMZXZlbCI6NCwiaWF0IjoxNzQzNDM5OTU0LCJleHAiOjE3NDM0NDM1NTR9.RGOB3vFydZ20rL_hWwk_nJu09QAoDkgb_1VnA2LNIHA
