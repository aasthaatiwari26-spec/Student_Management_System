import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmModal from "../../components/ConfirmModal";

function FacultyList() {
  const { faculty, deleteFaculty } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const departments = Array.from(new Set(faculty.map((f) => f.department)));

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "All" || f.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Faculty Directory ({filteredFaculty.length})</h2>
            <p>Teaching staff, departmental appointments, credentials, and courses</p>
          </div>
          <Link to="/faculty/add" className="primary-btn" style={{ width: "auto" }}>
            <PlusCircle size={16} />
            <span>Add Faculty</span>
          </Link>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search faculty by name, ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters-group">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Faculty ID</th>
                  <th>Name & Credentials</th>
                  <th>Department</th>
                  <th>Contact Info</th>
                  <th>Experience</th>
                  <th>Assigned Courses</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No faculty members found.
                    </td>
                  </tr>
                ) : (
                  filteredFaculty.map((member) => (
                    <tr key={member.id}>
                      <td><strong>{member.id}</strong></td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              background: "#eff6ff",
                              color: "var(--secondary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              fontSize: "0.85rem",
                            }}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{member.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              {member.qualification}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="custom-badge badge-info">{member.department}</span>
                      </td>
                      <td>
                        <div style={{ fontSize: "0.8rem" }}>{member.email}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{member.phone}</div>
                      </td>
                      <td>{member.experience || "10+ Years"}</td>
                      <td>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {member.assignedCourses && member.assignedCourses.length > 0 ? (
                            member.assignedCourses.map((c, i) => (
                              <span key={i} className="custom-badge badge-neutral" style={{ fontSize: "0.7rem" }}>
                                {c}
                              </span>
                            ))
                          ) : (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>None</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="custom-badge badge-success">{member.status || "Active"}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="table-actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            className="action-btn view"
                            title="View Profile"
                            onClick={() => navigate(`/faculty/${member.id}`)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="action-btn edit"
                            title="Edit Faculty"
                            onClick={() => navigate(`/faculty/edit/${member.id}`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            title="Delete Faculty"
                            onClick={() => setDeleteTarget(member)}
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

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Faculty Member"
        message={`Are you sure you want to remove ${deleteTarget?.name} (${deleteTarget?.id}) from the faculty directory?`}
        confirmText="Yes, Delete Faculty"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteFaculty(deleteTarget.id);
          }
        }}
      />
    </div>
  );
}

export default FacultyList;
