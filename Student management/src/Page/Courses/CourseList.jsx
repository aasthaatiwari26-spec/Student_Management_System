import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Users,
  GraduationCap,
  Clock,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmModal from "../../components/ConfirmModal";

function CourseList() {
  const { courses, deleteCourse, students } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const departments = Array.from(new Set(courses.map((c) => c.department)));

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "All" || course.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>All Courses ({filteredCourses.length})</h2>
            <p>Manage curriculum programs, assigned faculty, and enrolled student counts</p>
          </div>
          <Link to="/courses/add" className="primary-btn" style={{ width: "auto" }}>
            <PlusCircle size={16} />
            <span>Add Course</span>
          </Link>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search courses by name or ID..."
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
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Courses Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Credits</th>
                  <th>Assigned Faculty</th>
                  <th>Enrolled</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No courses match your query.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => {
                    const enrolledStudents = students.filter(
                      (s) => s.course === course.name
                    ).length;

                    return (
                      <tr key={course.id}>
                        <td><strong>{course.id}</strong></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{course.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {course.description ? course.description.substring(0, 50) + "..." : ""}
                          </div>
                        </td>
                        <td>
                          <span className="custom-badge badge-info">{course.department}</span>
                        </td>
                        <td>{course.duration}</td>
                        <td>{course.credits || 4} Credits</td>
                        <td>{course.assignedFaculty}</td>
                        <td>
                          <span className="custom-badge badge-neutral">
                            {enrolledStudents > 0 ? enrolledStudents : course.enrolledCount || 0} Students
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="table-actions" style={{ justifyContent: "flex-end" }}>
                            <button
                              type="button"
                              className="action-btn view"
                              title="View Details"
                              onClick={() => navigate(`/courses/${course.id}`)}
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              type="button"
                              className="action-btn edit"
                              title="Edit Course"
                              onClick={() => navigate(`/courses/edit/${course.id}`)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              className="action-btn delete"
                              title="Delete Course"
                              onClick={() => setDeleteTarget(course)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Course"
        message={`Are you sure you want to delete course "${deleteTarget?.name}" (${deleteTarget?.id})?`}
        confirmText="Yes, Delete Course"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteCourse(deleteTarget.id);
          }
        }}
      />
    </div>
  );
}

export default CourseList;
