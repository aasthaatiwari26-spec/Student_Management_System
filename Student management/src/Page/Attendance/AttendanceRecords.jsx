import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, PlusCircle, Filter, CalendarCheck, FileText } from "lucide-react";
import { useData } from "../../context/DataContext";

function AttendanceRecords() {
  const { attendance, courses } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  // Flatten attendance sessions into row items
  const flattenedRecords = attendance.flatMap((session) =>
    (session.records || []).map((rec) => ({
      sessionId: session.id,
      date: session.date,
      course: session.course,
      subject: session.subject || "General Session",
      studentId: rec.studentId,
      studentName: rec.studentName,
      status: rec.status,
    }))
  );

  const filteredRecords = flattenedRecords.filter((rec) => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = filterCourse === "All" || rec.course === filterCourse;
    const matchesDate = !filterDate || rec.date === filterDate;

    return matchesSearch && matchesCourse && matchesDate;
  });

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Attendance Records ({filteredRecords.length})</h2>
            <p>Historical log of roll-call records filtered by student, date, and program</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/attendance/mark" className="primary-btn" style={{ width: "auto" }}>
              <PlusCircle size={16} />
              <span>Mark Attendance</span>
            </Link>
            <Link to="/attendance/report" className="btn-secondary">
              <FileText size={16} />
              <span>Attendance Report</span>
            </Link>
          </div>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by student name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters-group">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="All">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{ width: "auto" }}
              />

              {filterDate && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setFilterDate("")}
                  style={{ fontSize: "0.8rem", padding: "8px 12px" }}
                >
                  Clear Date
                </button>
              )}
            </div>
          </div>

          {/* Attendance Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Session Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No attendance records match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item, idx) => (
                    <tr key={`${item.sessionId}-${item.studentId}-${idx}`}>
                      <td>{item.date}</td>
                      <td><strong>{item.studentId}</strong></td>
                      <td>
                        <Link to={`/students/${item.studentId}`} className="forgot-link" style={{ fontWeight: 600 }}>
                          {item.studentName}
                        </Link>
                      </td>
                      <td>{item.course}</td>
                      <td>{item.subject}</td>
                      <td>
                        <span
                          className={`custom-badge ${
                            item.status === "Present"
                              ? "badge-success"
                              : item.status === "Late"
                              ? "badge-warning"
                              : "badge-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceRecords;
