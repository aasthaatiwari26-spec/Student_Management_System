import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Helper to sanitize user object (remove password)
function sanitizeUser(user) {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  if (userObj._id && !userObj.id) {
    userObj.id = userObj._id.toString();
  }
  return userObj;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================
// SIGN UP (MongoDB Mongoose)
// ==========================================
export async function signup(req, res) {
  try {
    const { fullName, email, phone, role, password, confirmPassword } = req.body;

    // 1. Validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, phone, role, password).",
      });
    }

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Normalize role: match enum case-insensitively, default to "Student"
    const validRoles = ["Admin", "Faculty", "Student"];
    const matchedRole = validRoles.find(
      (r) => r.toLowerCase() === (role || "").trim().toLowerCase()
    );
    const normalizedRole = matchedRole || "Student";

    // 2. Duplicate Check in MongoDB
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists. Please login instead.",
      });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save to MongoDB
    const newUser = await User.create({
      fullName: trimmedFullName,
      email: trimmedEmail,
      phone: trimmedPhone,
      role: normalizedRole,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully! You can now log in.",
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    console.error("MongoDB Signup Error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", ") || "Validation error during registration.",
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists. Please login instead.",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during registration.",
    });
  }
}

// ==========================================
// LOGIN (MongoDB Mongoose)
// ==========================================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your registered email and password.",
      });
    }

    const trimmedInput = email.trim();
    const trimmedEmail = trimmedInput.toLowerCase();

    // 1. Find user in MongoDB (support email OR case-insensitive fullName/username)
    const escapedInput = trimmedInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const user = await User.findOne({
      $or: [
        { email: trimmedEmail },
        { fullName: { $regex: new RegExp(`^${escapedInput}$`, "i") } },
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 2. Compare Bcrypt Password Hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("MongoDB Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during login.",
    });
  }
}

// ==========================================
// UPDATE PROFILE
// ==========================================
export async function updateProfile(req, res) {
  try {
    const { id, fullName, email, phone, role } = req.body;

    let user = null;
    if (id) {
      user = await User.findById(id).catch(() => null);
    }
    if (!user && email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (fullName) user.fullName = fullName.trim();
    if (email) user.email = email.trim().toLowerCase();
    if (phone) user.phone = phone.trim();
    if (role) user.role = role.trim();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile." });
  }
}

// ==========================================
// CHANGE PASSWORD
// ==========================================
export async function changePassword(req, res) {
  try {
    const { id, _id, email, currentPassword, newPassword, confirmPassword } = req.body;
    const finalConfirmPassword = confirmPassword || newPassword;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all password fields.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long.",
      });
    }

    if (newPassword !== finalConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match.",
      });
    }

    let user = null;
    const searchId = id || _id;
    if (searchId) {
      user = await User.findById(searchId).catch(() => null);
    }
    if (!user && email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ success: false, message: "Failed to change password." });
  }
}

// ==========================================
// FORGOT PASSWORD
// ==========================================
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your registered email address.",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reset verification link generated! Redirecting to password reset page...",
      email: user.email,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Failed to process forgot password request." });
  }
}

// ==========================================
// RESET PASSWORD
// ==========================================
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, password, confirmPassword } = req.body;
    const finalPassword = newPassword || password;
    const finalConfirm = confirmPassword || finalPassword;

    if (!email || !finalPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email and new password.",
      });
    }

    if (finalPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    if (finalPassword !== finalConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(finalPassword, salt);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully! You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ success: false, message: "Failed to reset password." });
  }
}
