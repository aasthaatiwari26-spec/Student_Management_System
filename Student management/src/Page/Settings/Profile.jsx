import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Shield,
  Edit,
  Lock,
  LogOut,
  Camera,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>User Profile</h2>
            <p>Your institutional administrator account details and contact preferences</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/settings/edit-profile" className="primary-btn" style={{ width: "auto" }}>
              <Edit size={16} />
              <span>Edit Profile</span>
            </Link>
            <Link to="/settings/change-password" className="btn-secondary">
              <Lock size={16} />
              <span>Change Password</span>
            </Link>
          </div>
        </div>

        <div className="card-body">
          {/* User Hero Banner */}
          <div className="profile-hero" style={{ background: "linear-gradient(135deg, #312e81, #1e1b4b)" }}>
            <div className="profile-avatar-large" style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>
              {user?.fullName?.charAt(0) || "A"}
            </div>
            <div className="profile-info">
              <h1>{user?.fullName || "Administrator"}</h1>
              <p>{user?.email || "admin@college.edu"}</p>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <span className="custom-badge badge-success">{user?.role || "Admin"}</span>
                <span className="custom-badge badge-neutral">Active Session</span>
              </div>
            </div>
          </div>

          <div className="info-grid" style={{ marginTop: 24 }}>
            <div className="info-item">
              <label>Full Name</label>
              <p>{user?.fullName}</p>
            </div>
            <div className="info-item">
              <label>Official Email Address</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>Phone Contact</label>
              <p>{user?.phone || "+91 98765 00123"}</p>
            </div>
            <div className="info-item">
              <label>System Role & Privileges</label>
              <p>{user?.role || "Administrator"}</p>
            </div>
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Session Management</h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Sign out of your active session on this workstation
              </p>
            </div>

            <button
              type="button"
              className="btn-danger"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout of Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
