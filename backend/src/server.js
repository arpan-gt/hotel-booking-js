import express from "express";
const app = express();
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB";
import cors from "cors";
import authRouter from "./routes/auth.router";
import profileRouter from "./routes/profile.router";
import hotelRouter from "./routes/hotel.router";
const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/hotel", hotelRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`listening to PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
