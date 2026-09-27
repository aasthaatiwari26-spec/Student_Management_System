import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Filter,
  UserCheck,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmModal from "../../components/ConfirmModal";

function StudentList() {
  const { students, deleteStudent, courses } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterGender, setFilterGender] = useState("All");

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter & search logic
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = filterCourse === "All" || student.course === filterCourse;
    const matchesGender = filterGender === "All" || student.gender === filterGender;

    return matchesSearch && matchesCourse && matchesGender;
  });

  return (
    <div>
      {/* Header and Add Action */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2>All Students ({filteredStudents.length})</h2>
            <p>View, search, and manage registered student profiles</p>
          </div>
          <Link to="/students/add" className="primary-btn" style={{ width: "auto" }}>
            <PlusCircle size={16} />
            <span>Add Student</span>
          </Link>
        </div>

        <div className="card-body">
          {/* Toolbar: Search and Filters */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by ID, name, or email..."
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

              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Student Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Course</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No students found matching the filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <strong>{student.id}</strong>
                      </td>
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
                      <td>{student.gender}</td>
                      <td>{student.phone}</td>
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
                        <span className="custom-badge badge-success">{student.status || "Active"}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="table-actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            className="action-btn view"
                            title="View Profile"
                            onClick={() => navigate(`/students/${student.id}`)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="action-btn edit"
                            title="Edit Student"
                            onClick={() => navigate(`/students/edit/${student.id}`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            title="Delete Student"
                            onClick={() => setDeleteTarget(student)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Student Profile"
        message={`Are you sure you want to delete ${deleteTarget?.fullName} (${deleteTarget?.id})? This action cannot be undone.`}
        confirmText="Yes, Delete Student"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteStudent(deleteTarget.id);
          }
        }}
      />
    </div>
  );
}

export default StudentList;
