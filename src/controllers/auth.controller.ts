import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// const login = async (req, res, next) => {
//   try {
//     const { password, email } = req.body;
//     const account = await User.findOne({ email: email });
//     if (!account) {
//       return res.status(404).json({
//         message: "No such account found",
//       });
//     }
//     const comparePassword = await bcrypt.compare(password, account.password);
//     if (!comparePassword) {
//       return res.status(401).json({
//         message: "Password is incorrect",
//       });
//     }

//     const payload = {
//       id: account.id,
//     };
//     const accessToken = await jwt.sign(
//       {
//         payload,
//       },
//       process.env.PRIVATE_KEY,
//       { expiresIn: process.env.JWT_TIME }
//     );
//     if (!accessToken) {
//       throw new Error();
//     }

//     return res.status(200).json({
//       message: "success",
//       token: accessToken,
//       fullName: account.fullName,
//       email: account.email,
//       phoneNumber: account.phoneNumber,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
// const editUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const { fullName, email, phoneNumber } = req.body;
//     if (!authHeader) {
//       return res.status(400).json({ message: "Token is missing" });
//     }
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(400).json({ message: "Invalid token format" });
//     }

//     const userId = await jwt.verify(token, process.env.PRIVATE_KEY);
//     console.log("Verified User ID:", userId.payload.id);
//     const account = await user.findOne({
//       _id: new ObjectId(userId.payload.id),
//     });
//     const updatedUser = await user.findOneAndUpdate(
//       account,
//       { $set: { fullName, email, phoneNumber } },
//       { new: true }
//     );
//     return res.status(200).json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const editPassword = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(400).json({ message: "Token is missing" });
//     }
//     const token = authHeader.split(" ")[1];
//     console.log("token ", token);
//     if (!token) {
//       return res.status(400).json({ message: "Invalid token format" });
//     }
//     console.log("Token extracted:", token);
//     const userId = await jwt.verify(token, process.env.PRIVATE_KEY);
//     console.log("Verified User ID:", userId.payload.id);
//     const { currentPassword, confirmPassword, newPassword } = req.body;
//     console.log("Request Body Data:", {
//       currentPassword,
//       confirmPassword,
//       newPassword,
//     });
//     const account = await user.findOne({
//       _id: new ObjectId(userId.payload.id),
//     });
//     if (!account) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }
//     const comparePassword = await bcrypt.compare(
//       currentPassword,
//       account.password
//     );
//     if (!comparePassword) {
//       return res.status(403).json({
//         message: "Current password is incorrect",
//       });
//     }
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//     account.password = hashedNewPassword;
//     await account.save();

//     return res.status(200).json({
//       message: "Password updated successfully",
//     });
//   } catch (error) {
//     console.error("Error in editPassword:", error.message, error.stack);

//     return res.status(500).json({
//       message: "Internal Server Error: Unable to process the request",
//     });
//   }
// };
