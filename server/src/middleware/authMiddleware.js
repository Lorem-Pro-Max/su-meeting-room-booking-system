import jwt from "jsonwebtoken";
import { findUserById } from "../auth/repository.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await findUserById(decoded.id);

    if (!user || user.status_name === "inactive") {
      return res.status(403).json({
        message: "บัญชีถูกระงับ กรุณาเข้าสู่ระบบใหม่",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Access Token Expired" });
  }
};
