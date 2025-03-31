import jwt from "jsonwebtoken";
import { jwtSecret } from "../index.js";

export const verifyToken = (req, res, next) => {
  const bearerAuth =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!bearerAuth) {
    return res.status(403).send("A token is required for authentication");
  }
  const token = bearerAuth.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
