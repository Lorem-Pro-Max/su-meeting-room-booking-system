import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, saveRefreshToken } from "./repository.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });

    // สร้าง Tokens
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    // บันทึก Refresh Token ลง DB
    await saveRefreshToken(
      user.id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    // ส่ง Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: {
        username: user.username,
        role: user.role_id,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
