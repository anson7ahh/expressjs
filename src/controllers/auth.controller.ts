import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    const findAccount = await User.findOne({ email });
    if (findAccount) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
    });
    return res.status(201).json({
      success: true,
      newUser,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const account = await User.findOne({ email }).select("+password");
    if (!account) {
      throw new Error("User not found");
    }

    const comparePassword = await bcrypt.compare(password, account.password);
    if (!comparePassword) {
      throw new Error("password is incorrect");
    }

    const privateKey = process.env.PRIVATE_KEY;
    const refreshKey = process.env.REFRESH_KEY;

    if (!privateKey || !refreshKey) {
      throw new Error("PRIVATE_KEY or REFRESH_KEY not defined in env");
    }
    const payload = { id: account._id };
    const accessToken = jwt.sign(payload, privateKey, { expiresIn: "15m" });

    const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: accessToken,
      fullName: account.name,
      email: account.email,
    });
  } catch (err) {
    next(err);
  }
};
