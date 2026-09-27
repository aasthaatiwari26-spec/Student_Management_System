import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Check,
} from "lucide-react";
import { useData } from "../../context/DataContext";

function MarkAttendance() {
  const navigate = useNavigate();
  const { courses, students, saveAttendance } = useData();

  const [selectedCourse, setSelectedCourse] = useState(
    courses.length > 0 ? courses[0].name : "Computer Science Engineering"
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [subject, setSubject] = useState("Core Lecture");
  const [attendanceMap, setAttendanceMap] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Get matching students
  const filteredStudents = students.filter(
    (s) => s.course.toLowerCase() === selectedCourse.toLowerCase()
  );

  // Initialize attendance records when course or student list changes
  useEffect(() => {
    const initial = {};
    filteredStudents.forEach((student) => {
      initial[student.id] = "Present";
    });
    setAttendanceMap(initial);
  }, [selectedCourse, students]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const markAll = (status) => {
    const updated = {};
    filteredStudents.forEach((student) => {
      updated[student.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (filteredStudents.length === 0) {
      alert("No students in this course to mark attendance.");
      return;
    }

    const records = filteredStudents.map((student) => ({
      studentId: student.id,
      studentName: student.fullName,
      status: attendanceMap[student.id] || "Present",
    }));

    saveAttendance({
      course: selectedCourse,
      date: selectedDate,
      subject,
      records,
    });

    setSuccessMsg(`Attendance for ${selectedCourse} on ${selectedDate} has been saved successfully!`);
    setTimeout(() => {
      navigate("/attendance/records");
    }, 1500);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Mark Attendance</h2>
            <p>Conduct daily roll call and record student presence by course</p>
          </div>
          <Link to="/attendance/records" className="btn-secondary">
            View Attendance Records
          </Link>
        </div>

        <div className="card-body">
          {successMsg && (
            <div className="success-alert">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Controls */}
          <div className="form-grid" style={{ marginBottom: 24 }}>
            <div className="form-group">
              <label>Select Course *</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Select Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group form-grid-full">
              <label>Session / Subject Topic</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Unit 3 - Tree Traversals"
              />
            </div>
          </div>

          {/* Bulk quick actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              background: "#f8fafc",
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div>
              <strong style={{ fontSize: "0.9rem" }}>
                Students in Roster: {filteredStudents.length}
              </strong>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                onClick={() => markAll("Present")}
              >
                Mark All Present
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                onClick={() => markAll("Absent")}
              >
                Mark All Absent
              </button>
            </div>
          </div>

          {/* Student List & Attendance Selection */}
          {filteredStudents.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
              No students enrolled in {selectedCourse}. Try selecting another course or add students to this course.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Roll Status</th>
                    <th style={{ textAlign: "right" }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const currentStatus = attendanceMap[student.id] || "Present";
                    return (
                      <tr key={student.id}>
                        <td><strong>{student.id}</strong></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{student.fullName}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{student.email}</div>
                        </td>
                        <td>
                          <span
                            className={`custom-badge ${
                              currentStatus === "Present"
                                ? "badge-success"
                                : currentStatus === "Late"
                                ? "badge-warning"
                                : "badge-danger"
                            }`}
                          >
                            {currentStatus}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: 8 }}>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(student.id, "Present")}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                background: currentStatus === "Present" ? "#10b981" : "#f1f5f9",
                                color: currentStatus === "Present" ? "white" : "var(--text-secondary)",
                                border: "none",
                              }}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(student.id, "Late")}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                background: currentStatus === "Late" ? "#f59e0b" : "#f1f5f9",
                                color: currentStatus === "Late" ? "white" : "var(--text-secondary)",
                                border: "none",
                              }}
                            >
                              Late
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(student.id, "Absent")}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                background: currentStatus === "Absent" ? "#ef4444" : "#f1f5f9",
                                color: currentStatus === "Absent" ? "white" : "var(--text-secondary)",
                                border: "none",
                              }}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="form-actions">
            <Link to="/attendance/records" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="button"
              className="primary-btn"
              style={{ width: "auto" }}
              onClick={handleSave}
              disabled={filteredStudents.length === 0}
            >
              <Save size={16} />
              <span>Save Attendance</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;
