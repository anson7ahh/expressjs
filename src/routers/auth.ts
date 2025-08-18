import express from "express";
import { register } from "../controllers/auth.controller.ts";

const authRouter = express.Router();

authRouter.post("/register", register);
// router.post("/login", login);
// router.put("/edit", editUser);
// router.put("/edit-password", editPassword);

export default authRouter;
