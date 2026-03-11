import User from "../models/user.model";
import { validateLogin, validateSignup } from "../utils/validation";
import jwt from "jsonwebtoken";

// {login controller}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    validateLogin(req.body);

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "-password",
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  {signup controller}
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, gender, dateOfBirth } = req.body;
    validateSignup(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      gender,
      dateOfBirth,
    });
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
      _id: newUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  { logout controller}
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User logged out",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
