import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Calendar,
  Bell,
  ArrowUpRight,
  TrendingUp,
  PlusCircle,
  Clock,
  Award,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { students, faculty, courses, exams, notices } = useData();
  const { user } = useAuth();

  // Compute average attendance
  const avgAttendance = students.length
    ? Math.round(
        students.reduce((acc, s) => acc + (s.attendancePercentage || 0), 0) /
          students.length
      )
    : 0;

  // Department distribution calculation for chart
  const deptCounts = courses.reduce((acc, course) => {
    const dept = course.department || "Other";
    acc[dept] = (acc[dept] || 0) + (course.enrolledCount || 20);
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(deptCounts), 1);

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
          color: "white",
          padding: "24px 28px",
          borderRadius: "var(--radius-lg)",
          marginBottom: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.3)",
        }}
      >
        <div>
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800, marginBottom: 4 }}>
            Welcome back, {user?.fullName || "Administrator"}! 👋
          </h2>
          <p style={{ color: "#e0e7ff", fontSize: "0.9rem" }}>
            Here is your daily overview of student enrollments, attendance metrics, and campus schedules.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Link
            to="/students/add"
            className="btn-secondary"
            style={{ background: "white", color: "var(--primary)", border: "none" }}
          >
            <PlusCircle size={16} />
            <span>Add Student</span>
          </Link>
          <Link
            to="/attendance/mark"
            className="btn-secondary"
            style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            <Clock size={16} />
            <span>Mark Attendance</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="dashboard-grid">
        {/* Total Students */}
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Students</span>
            <h3>{students.length}</h3>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>+12% this semester</span>
            </div>
          </div>
        </div>

        {/* Total Faculty */}
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <GraduationCap size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Faculty</span>
            <h3>{faculty.length}</h3>
            <div className="stat-trend up">
              <span>Full-time Professors</span>
            </div>
          </div>
        </div>

        {/* Total Courses */}
        <div className="stat-card">
          <div className="stat-icon-wrapper amber">
            <BookOpen size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Courses</span>
            <h3>{courses.length}</h3>
            <div className="stat-trend up">
              <span>5 Active Departments</span>
            </div>
          </div>
        </div>

        {/* Attendance Percentage */}
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CalendarCheck size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Avg. Attendance</span>
            <h3>{avgAttendance}%</h3>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>Above target threshold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Statistics Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 28 }}>
        {/* Department Enrollment Bar Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <h3>Enrollment by Department</h3>
              <p>Active student distribution across major streams</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {Object.entries(deptCounts).map(([dept, count]) => {
                const percentage = Math.round((count / maxCount) * 100);
                return (
                  <div key={dept}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.85rem" }}>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{dept}</span>
                      <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{count} Students</span>
                    </div>
                    <div style={{ width: "100%", height: 10, background: "#f1f5f9", borderRadius: 5, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #4f46e5, #0ea5e9)",
                          borderRadius: 5,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Attendance Performance Overview */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <h3>Attendance Statistics</h3>
              <p>Roster compliance breakdown</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 0" }}>
              {/* Circular KPI */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "8px solid #4f46e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                    margin: "0 auto 8px",
                  }}
                >
                  {avgAttendance}%
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Campus Average</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <strong>{students.filter((s) => s.attendancePercentage >= 85).length}</strong> High (&ge; 85%)
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <strong>{students.filter((s) => s.attendancePercentage >= 75 && s.attendancePercentage < 85).length}</strong> Standard (75 - 84%)
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <strong>{students.filter((s) => s.attendancePercentage < 75).length}</strong> Critical (&lt; 75%)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Link to="/attendance/report" className="forgot-link" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                View Comprehensive Attendance Report &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming Exams & Recent Notices */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 28 }}>
        {/* Upcoming Exams */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <h3>
                <Calendar size={18} style={{ color: "var(--primary)" }} />
                Upcoming Examinations
              </h3>
            </div>
            <Link to="/exams" className="forgot-link" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
              View All
            </Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {exams.length === 0 ? (
              <p style={{ padding: 20, color: "var(--text-muted)" }}>No upcoming exams scheduled.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {exams.slice(0, 3).map((exam) => (
                  <div
                    key={exam.id}
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {exam.name}
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {exam.subject} • {exam.course}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="custom-badge badge-warning" style={{ display: "inline-block" }}>
                        {exam.date}
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                        Max: {exam.totalMarks} marks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <h3>
                <Bell size={18} style={{ color: "var(--warning)" }} />
                Recent Notices & Announcements
              </h3>
            </div>
            <Link to="/notices" className="forgot-link" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
              View All
            </Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span
                      className={`custom-badge ${
                        notice.priority === "High" ? "badge-danger" : "badge-info"
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{notice.date}</span>
                  </div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", margin: "4px 0" }}>
                    {notice.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {notice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Students Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3>
              <Users size={18} style={{ color: "var(--primary)" }} />
              Recent Students
            </h3>
            <p>Recently registered candidates</p>
          </div>
          <Link to="/students" className="btn-secondary">
            View All Students
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Enrolled Course</th>
                <th>Admission Date</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((student) => (
                <tr key={student.id}>
                  <td><strong>{student.id}</strong></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#e0e7ff",
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                        }}
                      >
                        {student.fullName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{student.fullName}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{student.course}</td>
                  <td>{student.admissionDate}</td>
                  <td>
                    <span
                      className={`custom-badge ${
                        student.attendancePercentage >= 85
                          ? "badge-success"
                          : student.attendancePercentage >= 75
                          ? "badge-warning"
                          : "badge-danger"
                      }`}
                    >
                      {student.attendancePercentage}%
                    </span>
                  </td>
                  <td>
                    <span className="custom-badge badge-success">{student.status}</span>
                  </td>
                  <td>
                    <Link to={`/students/${student.id}`} className="forgot-link" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;