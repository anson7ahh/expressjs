import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDatabase } from "./src/config/database.ts";
import { handleError } from "./src/middlewares/handleError.middleware.ts";
import authRouter from "./src/routers/auth.router.ts";
import { limiter } from "./src/middlewares/ratelimit.middleware.ts";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDatabase();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(limiter);
app.use("/auth", authRouter);
app.use(handleError);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
