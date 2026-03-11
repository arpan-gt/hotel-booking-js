import express from "express";
import {
  createHotel,
  fetchHotels,
  fetchHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authorizeRoles from "../middlewares/authorizeRoles.middleware";
const hotelRouter = express.Router();

hotelRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  createHotel,
);
hotelRouter.get("/", fetchHotels);
hotelRouter.get("/:id", fetchHotelById);
hotelRouter.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN", "EMPLOYER"),
  updateHotel,
);
hotelRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  deleteHotel,
);
export default hotelRouter;
