import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useData } from "../../context/DataContext";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, marks, attendance } = useData();

  const [activeTab, setActiveTab] = useState("academic"); // 'academic', 'attendance', 'marks'

  const student = getStudentById(id);

  if (!student) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Student profile could not be found.</p>
          <Link to="/students" className="btn-secondary" style={{ marginTop: 12 }}>
            Return to Student Directory
          </Link>
        </div>
      </div>
    );
  }

  // Filter student's marks
  const studentMarks = marks.filter((m) => m.studentId === student.id);

  // Filter student's attendance records
  const studentAttendanceRecords = attendance.filter((att) =>
    att.records?.some((r) => r.studentId === student.id)
  );

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/students" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Students</span>
        </Link>
        <Link to={`/students/edit/${student.id}`} className="primary-btn" style={{ width: "auto" }}>
          <Edit size={16} />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="profile-hero">
        <div className="profile-avatar-large">
          {student.fullName.charAt(0)}
        </div>
        <div className="profile-info">
          <h1>{student.fullName}</h1>
          <p>{student.course} • ID: {student.id}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <span className="custom-badge badge-success">{student.status || "Active"}</span>
            <span className="custom-badge badge-info">{student.academicYear || "3rd Year"}</span>
          </div>
        </div>
      </div>

      {/* Top summary cards */}
      <div className="dashboard-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CalendarCheck size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Attendance Rate</span>
            <h3>{student.attendancePercentage || 85}%</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--success)" }}>Satisfactory</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Award size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Evaluated Exams</span>
            <h3>{studentMarks.length}</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Tests Recorded</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <BookOpen size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Program</span>
            <h3 style={{ fontSize: "1.1rem" }}>{student.course}</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Active Cohort</span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="profile-tabs">
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "academic" ? "active" : ""}`}
          onClick={() => setActiveTab("academic")}
        >
          Personal & Academic Info
        </button>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance History
        </button>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "marks" ? "active" : ""}`}
          onClick={() => setActiveTab("marks")}
        >
          Marks & Results ({studentMarks.length})
        </button>
      </div>

      {/* Tab: Academic & Personal Info */}
      {activeTab === "academic" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {/* Personal Information */}
          <div className="card">
            <div className="card-header">
              <h3>
                <User size={18} style={{ color: "var(--primary)" }} />
                Personal Information
              </h3>
            </div>
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{student.fullName}</p>
                </div>
                <div className="info-item">
                  <label>Student ID</label>
                  <p>{student.id}</p>
                </div>
                <div className="info-item">
                  <label>Date of Birth</label>
                  <p>{student.dob || "N/A"}</p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p>{student.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card">
            <div className="card-header">
              <h3>
                <Phone size={18} style={{ color: "var(--secondary)" }} />
                Contact Information
              </h3>
            </div>
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <label>Email Address</label>
                  <p>{student.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone Number</label>
                  <p>{student.phone}</p>
                </div>
                <div className="info-item" style={{ gridColumn: "span 2" }}>
                  <label>Residential Address</label>
                  <p>{student.address || "Not specified"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course & Academic Details */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <h3>
                <BookOpen size={18} style={{ color: "var(--info)" }} />
                Course & Academic Details
              </h3>
            </div>
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <label>Enrolled Course</label>
                  <p>{student.course}</p>
                </div>
                <div className="info-item">
                  <label>Admission Date</label>
                  <p>{student.admissionDate}</p>
                </div>
                <div className="info-item">
                  <label>Academic Year</label>
                  <p>{student.academicYear || "3rd Year"}</p>
                </div>
                <div className="info-item">
                  <label>Current Semester</label>
                  <p>{student.semester || "6th Semester"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Attendance */}
      {activeTab === "attendance" && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Attendance Log</h3>
              <p>Roll call logs and records for {student.fullName}</p>
            </div>
            <span className="custom-badge badge-success">Overall: {student.attendancePercentage}%</span>
          </div>
          <div className="card-body">
            {studentAttendanceRecords.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 20 }}>
                No explicit attendance history logged for this student yet.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Subject</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAttendanceRecords.map((att) => {
                      const record = att.records.find((r) => r.studentId === student.id);
                      return (
                        <tr key={att.id}>
                          <td>{att.date}</td>
                          <td>{att.course}</td>
                          <td>{att.subject || "-"}</td>
                          <td>
                            <span
                              className={`custom-badge ${
                                record?.status === "Present"
                                  ? "badge-success"
                                  : record?.status === "Late"
                                  ? "badge-warning"
                                  : "badge-danger"
                              }`}
                            >
                              {record?.status || "Present"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Marks */}
      {activeTab === "marks" && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Examination Marks & Grades</h3>
              <p>Official assessment grades scored by {student.fullName}</p>
            </div>
          </div>
          <div className="card-body">
            {studentMarks.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 20 }}>
                No exam results recorded for this student yet.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Subject</th>
                      <th>Marks Obtained</th>
                      <th>Total Marks</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentMarks.map((m) => (
                      <tr key={m.id}>
                        <td><strong>{m.examName}</strong></td>
                        <td>{m.subject}</td>
                        <td>{m.marksObtained}</td>
                        <td>{m.totalMarks}</td>
                        <td>{m.percentage}%</td>
                        <td>
                          <span className="custom-badge badge-info">{m.grade}</span>
                        </td>
                        <td>
                          <span
                            className={`custom-badge ${
                              m.resultStatus === "Pass" ? "badge-success" : "badge-danger"
                            }`}
                          >
                            {m.resultStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
