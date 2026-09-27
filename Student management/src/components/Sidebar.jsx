import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  Calendar,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Award,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { students, notices } = useData();
  const navigate = useNavigate();

  // Collapsible sub-menus
  const [openMenus, setOpenMenus] = useState({
    students: true,
    courses: false,
    attendance: false,
    exams: false,
    timetable: false,
    faculty: false,
    notices: false,
    settings: false,
  });

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand-icon">
          <GraduationCap size={22} />
        </div>
        <div className="sidebar-brand-text">
          <h2>SMS Portal</h2>
          <span>Education Management</span>
        </div>
      </div>

      {/* Navigation list */}
      <div className="sidebar-nav">
        <div className="sidebar-section-title">Main Navigation</div>

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          onClick={onClose}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* Students Section */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("students")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Users size={18} />
              <span>Students</span>
            </div>
            {openMenus.students ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.students && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/students"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>All Students</span>
                <span className="badge">{students.length}</span>
              </NavLink>
              <NavLink
                to="/students/add"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <PlusCircle size={14} />
                <span>Add Student</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Courses Section */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("courses")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <BookOpen size={18} />
              <span>Courses</span>
            </div>
            {openMenus.courses ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.courses && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/courses"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>All Courses</span>
              </NavLink>
              <NavLink
                to="/courses/add"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <PlusCircle size={14} />
                <span>Add Course</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Attendance Section */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("attendance")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CalendarCheck size={18} />
              <span>Attendance</span>
            </div>
            {openMenus.attendance ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.attendance && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/attendance/mark"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <Clock size={14} />
                <span>Mark Attendance</span>
              </NavLink>
              <NavLink
                to="/attendance/records"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>Attendance Records</span>
              </NavLink>
              <NavLink
                to="/attendance/report"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>Attendance Report</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Examinations Section */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("exams")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FileSpreadsheet size={18} />
              <span>Examinations</span>
            </div>
            {openMenus.exams ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.exams && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/exams"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>Exams List</span>
              </NavLink>
              <NavLink
                to="/exams/create"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <PlusCircle size={14} />
                <span>Create Exam</span>
              </NavLink>
              <NavLink
                to="/exams/enter-marks"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>Enter Marks</span>
              </NavLink>
              <NavLink
                to="/exams/results"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <Award size={14} />
                <span>Results</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Timetable */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("timetable")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Calendar size={18} />
              <span>Timetable</span>
            </div>
            {openMenus.timetable ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.timetable && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/timetable"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>View Timetable</span>
              </NavLink>
              <NavLink
                to="/timetable/add"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <PlusCircle size={14} />
                <span>Add Timetable</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Faculty */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("faculty")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <GraduationCap size={18} />
              <span>Faculty</span>
            </div>
            {openMenus.faculty ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.faculty && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/faculty"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>Faculty List</span>
              </NavLink>
              <NavLink
                to="/faculty/add"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <PlusCircle size={14} />
                <span>Add Faculty</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Notices */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("notices")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Bell size={18} />
              <span>Notices</span>
            </div>
            {openMenus.notices ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.notices && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/notices"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>All Notices</span>
                <span className="badge">{notices.length}</span>
              </NavLink>
              <NavLink
                to="/notices/create"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <PlusCircle size={14} />
                <span>Create Notice</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Reports */}
        <NavLink
          to="/reports"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          onClick={onClose}
        >
          <BarChart3 size={18} />
          <span>Reports & Analytics</span>
        </NavLink>

        <div className="sidebar-section-title">System</div>

        {/* Settings */}
        <div className="sidebar-dropdown">
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", justifyContent: "space-between" }}
            onClick={() => toggleMenu("settings")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Settings size={18} />
              <span>Settings</span>
            </div>
            {openMenus.settings ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.settings && (
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLink
                to="/settings/profile"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>My Profile</span>
              </NavLink>
              <NavLink
                to="/settings/change-password"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>Change Password</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Footer with current user and logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.fullName || "Administrator"}</div>
            <div className="sidebar-user-role">{user?.role || "Admin"}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="logout-icon-btn"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
