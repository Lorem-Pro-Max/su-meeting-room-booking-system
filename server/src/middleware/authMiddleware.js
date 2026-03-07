import jwt from "jsonwebtoken";
import { findUserById } from "../auth/repository.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return res.status(403).json({ message: "Access Token Expired" });
  }

  const user = await findUserById(decoded.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.status_name === "inactive") {
    return res.status(403).json({
      message: "บัญชีของคุณถูกระงับการใช้งาน",
    });
  }

  req.user = user;
  next();
};
