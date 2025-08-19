import express from "express";
import { orderDocument } from "../controllers/order.controller.ts";
import { checkToken } from "../middlewares/checkToken.middleware.ts";

const orderRouter = express.Router();

orderRouter.post("/order", checkToken, orderDocument);

export default orderRouter;
