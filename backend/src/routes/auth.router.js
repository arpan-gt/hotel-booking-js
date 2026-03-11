import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
