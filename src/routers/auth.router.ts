import express from "express";
import { login, register } from "../controllers/auth.controller.ts";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
// router.put("/edit", editUser);
// router.put("/edit-password", editPassword);

export default authRouter;
