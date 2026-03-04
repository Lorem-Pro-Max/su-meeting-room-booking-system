import jwt from "jsonwebtoken";
import { findUserById } from "../auth/repository.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Access Token Expired" });
    req.user = user;
    next();
  });
};
