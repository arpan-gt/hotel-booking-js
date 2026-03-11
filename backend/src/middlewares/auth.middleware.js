import jwt from "jsonwebtoken";
import User from "../models/user.model";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized, no token found",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const user = await User.findOne({ _id: decoded._id }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "No user found",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
      success: false,
    });
  }
};
export default authMiddleware;
