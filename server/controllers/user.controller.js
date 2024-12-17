import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/genrateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // patel214
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
export const logout = async (_, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }); // Clear the cookie
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
    return; // Exit immediately after sending the response
  } catch (error) {
    console.error("Logout error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to logout",
      });
    }
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    // .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;

    if (!req.id) {
      return res.status(400).json({
        success: false,
        message: "User ID not provided.",
      });
    }

    const { name } = req.body;
    const profilePhoto = req.file;

    if (!profilePhoto) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Delete old photo if it exists
    if (user.photoUrl) {
      const publicId =
        user.photoId || user.photoUrl.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }

    // Upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, photoUrl },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};
