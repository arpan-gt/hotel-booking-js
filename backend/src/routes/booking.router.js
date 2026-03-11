import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { bookHotel, fetchMyBookings } from "../controllers/booking.controller";
import authorizeRoles from "../middlewares/authorizeRoles.middleware";
const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleware, bookHotel);
bookingRouter.get("/my-bookings", authMiddleware, fetchMyBookings);
bookingRouter.patch("/:id", authMiddleware, authorizeRoles("SUPER_ADMIN"));

export default bookingRouter;
