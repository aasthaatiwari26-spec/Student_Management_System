import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { notices } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Generate readable title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) return { title: "Dashboard", sub: "Overview & Real-time Analytics" };
    if (path.includes("/students/add")) return { title: "Add New Student", sub: "Register a student into the system" };
    if (path.includes("/students/edit")) return { title: "Edit Student", sub: "Update student records" };
    if (path.match(/\/students\/[^/]+$/)) return { title: "Student Profile", sub: "Academic & Personal Details" };
    if (path.includes("/students")) return { title: "Student Directory", sub: "Manage and filter student roster" };

    if (path.includes("/courses/add")) return { title: "Add New Course", sub: "Create a curriculum module" };
    if (path.includes("/courses/edit")) return { title: "Edit Course", sub: "Update course details" };
    if (path.match(/\/courses\/[^/]+$/)) return { title: "Course Details", sub: "Syllabus, Faculty & Enrolled Roster" };
    if (path.includes("/courses")) return { title: "Courses Management", sub: "Curriculum and departmental courses" };

    if (path.includes("/attendance/mark")) return { title: "Mark Attendance", sub: "Daily classroom roll call" };
    if (path.includes("/attendance/records")) return { title: "Attendance Logs", sub: "Historical attendance database" };
    if (path.includes("/attendance/report")) return { title: "Attendance Reports", sub: "Attendance statistics & insights" };

    if (path.includes("/exams/create")) return { title: "Create Examination", sub: "Schedule assessments & tests" };
    if (path.includes("/exams/enter-marks")) return { title: "Enter Marks", sub: "Score entries by subject" };
    if (path.includes("/exams/results")) return { title: "Results & Grade Cards", sub: "Student evaluations & GPA" };
    if (path.includes("/exams")) return { title: "Examinations", sub: "Upcoming & completed exam schedules" };

    if (path.includes("/timetable/add")) return { title: "Add Schedule Slot", sub: "Assign subject, room & faculty" };
    if (path.includes("/timetable")) return { title: "Weekly Timetable", sub: "Class schedule and lecture halls" };

    if (path.includes("/faculty/add")) return { title: "Add Faculty", sub: "Onboard teaching staff" };
    if (path.includes("/faculty/edit")) return { title: "Edit Faculty", sub: "Update faculty profile" };
    if (path.match(/\/faculty\/[^/]+$/)) return { title: "Faculty Profile", sub: "Instructor credentials & courses" };
    if (path.includes("/faculty")) return { title: "Faculty Directory", sub: "Academic staff members" };

    if (path.includes("/notices/create")) return { title: "Publish Notice", sub: "Draft circulars & announcements" };
    if (path.includes("/notices")) return { title: "Notice Board", sub: "Campus announcements & bulletins" };

    if (path.includes("/reports")) return { title: "Reports & Analytics", sub: "Comprehensive exportable reports" };

    if (path.includes("/settings/profile")) return { title: "Account Profile", sub: "Manage personal credentials" };
    if (path.includes("/settings/change-password")) return { title: "Security Settings", sub: "Update account password" };

    return { title: "Portal", sub: "Student Management System" };
  };

  const pageInfo = getPageTitle();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="page-title-crumbs">
          <h1>{pageInfo.title}</h1>
          <p>{pageInfo.sub}</p>
        </div>
      </div>

      <div className="navbar-right">
        {/* Notifications Icon with Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="nav-icon-badge-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            title="Recent Notices"
          >
            <Bell size={20} />
            {notices.length > 0 && <span className="nav-badge-count">{notices.length}</span>}
          </button>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 48,
                width: 320,
                background: "white",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--border-color)",
                padding: "16px",
                zIndex: 150,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: 8,
                }}
              >
                <strong style={{ fontSize: "0.9rem" }}>Recent Notices ({notices.length})</strong>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ color: "var(--text-muted)", cursor: "pointer" }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ maxHeight: 250, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                {notices.slice(0, 4).map((notice) => (
                  <div
                    key={notice.id}
                    style={{
                      padding: "8px 10px",
                      background: "#f8fafc",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.8rem",
                      borderLeft: "3px solid var(--primary)",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{notice.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginTop: 2 }}>{notice.date}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12, textAlign: "center", borderTop: "1px solid var(--border-color)", paddingTop: 8 }}>
                <Link
                  to="/notices"
                  style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}
                  onClick={() => setShowNotifications(false)}
                >
                  View All Notices &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: "var(--radius-md)",
              background: "#f1f5f9",
              border: "1px solid var(--border-color)",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {user?.fullName?.split(" ")[0] || "User"}
            </span>
          </button>

          {showUserDropdown && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 48,
                width: 200,
                background: "white",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--border-color)",
                padding: "8px 0",
                zIndex: 150,
              }}
            >
              <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{user?.fullName}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{user?.role || "Admin"}</div>
              </div>

              <Link
                to="/settings/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                }}
                onClick={() => setShowUserDropdown(false)}
              >
                <User size={16} />
                <span>My Profile</span>
              </Link>

              <Link
                to="/settings/change-password"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                }}
                onClick={() => setShowUserDropdown(false)}
              >
                <Settings size={16} />
                <span>Change Password</span>
              </Link>

              <div style={{ borderTop: "1px solid var(--border-color)", marginTop: 4, paddingTop: 4 }}>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 16px",
                    fontSize: "0.85rem",
                    color: "var(--danger)",
                    width: "100%",
                    textAlign: "left",
                  }}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
