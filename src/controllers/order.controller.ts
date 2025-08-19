import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Documents } from "../models/document.model.ts";
import { User } from "../models/user.model.ts";
import mongoose from "mongoose";
export const orderDocument = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { documentId } = req.body;
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    const document = await Documents.findById(documentId).session(session);
    if (!document) {
      throw new Error("Document not found");
    }
    const decoded = jwt.verify(
      accessToken,
      process.env.PRIVATE_KEY as string
    ) as JwtPayload;
    const buyer = await User.findById(decoded.id).session(session);
    if (!buyer) {
      throw new Error("User not found");
    }
    if (buyer.totalMoney < document.price) {
      throw new Error("Not enough money");
    }
    buyer.totalMoney -= document.price;
    await buyer.save({ session });
    const author = await User.findById(document.author).session(session);
    if (!author) {
      throw new Error("Author not found");
    }

    author.totalMoney += document.price;
    await author.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Purchase successful",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
