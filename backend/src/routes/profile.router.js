import express from "express";
import { fetchMyProfile } from "../controllers/profile.controller";
import authMiddleware from "../middlewares/auth.middleware";
const profileRouter = express.Router();

profileRouter.get("/", authMiddleware, fetchMyProfile);
profileRouter.patch("/:id", authMiddleware, updateProfile);
export default profileRouter;
