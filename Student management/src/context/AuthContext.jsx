import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Backend API endpoint (uses /api by default for same-origin production and Vite dev proxy)
const API_BASE = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) || "/api";
const API_URL = `${API_BASE}/auth`;

export const AuthProvider = ({ children }) => {
  // Restore logged-in user from localStorage if present
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sms_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("sms_isLoggedIn") === "true";
  });

  // Log in with registered credentials
  const login = async (email, password, rememberMe = false) => {
    let response;
    try {
      response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (networkErr) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running on port 5000."
      );
    }

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status >= 500 && !data.message) {
        throw new Error(
          "Unable to connect to the backend server. Please make sure the backend is running on port 5000."
        );
      }
      throw new Error(
        data.message || (response.status === 401 ? "Invalid email or password." : "Login failed. Please check your credentials.")
      );
    }

    // Set authenticated state
    setUser(data.user);
    setIsLoggedIn(true);

    // Save session in localStorage
    localStorage.setItem("sms_user", JSON.stringify(data.user));
    localStorage.setItem("sms_isLoggedIn", "true");

    if (rememberMe) {
      localStorage.setItem("sms_rememberMe", "true");
    }

    return data.user;
  };

  // Sign up a new user
  const signup = async (userData) => {
    let response;
    try {
      response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (networkErr) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running on port 5000."
      );
    }

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status >= 500 && !data.message) {
        throw new Error(
          "Unable to connect to the backend server. Please make sure the backend is running on port 5000."
        );
      }
      throw new Error(data.message || "Registration failed. Please check your details.");
    }

    return data;
  };

  // Forgot password request
  const forgotPassword = async (email) => {
    let response;
    try {
      response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (networkErr) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running on port 5000."
      );
    }

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status >= 500 && !data.message) {
        throw new Error(
          "Unable to connect to the backend server. Please make sure the backend is running on port 5000."
        );
      }
      throw new Error(data.message || "No account found with this email address.");
    }
    return data;
  };

  // Reset password
  const resetPassword = async (email, password, confirmPassword) => {
    let response;
    try {
      response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
    } catch (networkErr) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running on port 5000."
      );
    }

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status >= 500 && !data.message) {
        throw new Error(
          "Unable to connect to the backend server. Please make sure the backend is running on port 5000."
        );
      }
      throw new Error(data.message || "Failed to reset password.");
    }
    return data;
  };

  // Log out current session
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("sms_user");
    localStorage.removeItem("sms_isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  // Update profile details
  const updateProfile = async (updatedFields) => {
    if (!user) return;

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id || user._id,
          email: user.email,
          ...updatedFields,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setUser(data.user);
      localStorage.setItem("sms_user", JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      // Fallback update in state if backend unavailable
      const updated = { ...user, ...updatedFields };
      setUser(updated);
      localStorage.setItem("sms_user", JSON.stringify(updated));
      return updated;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    if (!user) throw new Error("No active user session.");

    let response;
    try {
      response = await fetch(`${API_URL}/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id || user._id,
          email: user.email,
          currentPassword,
          newPassword,
          confirmPassword: confirmPassword || newPassword,
        }),
      });
    } catch (networkErr) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running on port 5000."
      );
    }

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status >= 500 && !data.message) {
        throw new Error(
          "Unable to connect to the backend server. Please make sure the backend is running on port 5000."
        );
      }
      throw new Error(data.message || "Failed to change password.");
    }

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
