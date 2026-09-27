import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  Award,
  Layers,
} from "lucide-react";
import { useData } from "../../context/DataContext";

function CourseDetails() {
  const { id } = useParams();
  const { getCourseById, students, faculty } = useData();

  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Course not found.</p>
          <Link to="/courses" className="btn-secondary" style={{ marginTop: 12 }}>
            Return to Courses List
          </Link>
        </div>
      </div>
    );
  }

  // Find enrolled students for this course
  const enrolledStudents = students.filter(
    (s) => s.course.toLowerCase() === course.name.toLowerCase()
  );

  // Find faculty details
  const instructor = faculty.find((f) => f.name === course.assignedFaculty);

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/courses" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Courses</span>
        </Link>
        <Link to={`/courses/edit/${course.id}`} className="primary-btn" style={{ width: "auto" }}>
          <Edit size={16} />
          <span>Edit Course</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="profile-hero" style={{ background: "linear-gradient(135deg, #0284c7, #0f172a)" }}>
        <div className="profile-avatar-large" style={{ background: "linear-gradient(135deg, #38bdf8, #0284c7)" }}>
          <BookOpen size={36} />
        </div>
        <div className="profile-info">
          <h1>{course.name}</h1>
          <p>Course Code: {course.id} • {course.department}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <span className="custom-badge badge-info">{course.duration}</span>
            <span className="custom-badge badge-neutral">{course.credits || 4} Credits</span>
          </div>
        </div>
      </div>

      {/* Course Information Card */}
      <div className="card">
        <div className="card-header">
          <h3>
            <Layers size={18} style={{ color: "var(--primary)" }} />
            Course Information
          </h3>
        </div>
        <div className="card-body">
          <div className="info-grid" style={{ marginBottom: 20 }}>
            <div className="info-item">
              <label>Department</label>
              <p>{course.department}</p>
            </div>
            <div className="info-item">
              <label>Duration</label>
              <p>{course.duration}</p>
            </div>
            <div className="info-item">
              <label>Credits</label>
              <p>{course.credits || 4} Credits</p>
            </div>
            <div className="info-item">
              <label>Course Code</label>
              <p>{course.id}</p>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Syllabus & Course Description
            </label>
            <p style={{ marginTop: 6, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {course.description || "No detailed syllabus provided."}
            </p>
          </div>
        </div>
      </div>

      {/* Assigned Faculty */}
      <div className="card">
        <div className="card-header">
          <h3>
            <GraduationCap size={18} style={{ color: "var(--secondary)" }} />
            Assigned Faculty
          </h3>
        </div>
        <div className="card-body">
          {instructor ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#e0f2fe",
                  color: "#0284c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {instructor.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 700, fontSize: "1rem" }}>{instructor.name}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {instructor.department} • {instructor.qualification}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
                  Email: {instructor.email} • Phone: {instructor.phone}
                </p>
              </div>
              <Link to={`/faculty/${instructor.id}`} className="btn-secondary">
                View Faculty Profile
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: "var(--text-muted)" }}>
                Currently assigned to: <strong>{course.assignedFaculty}</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3>
              <Users size={18} style={{ color: "var(--success)" }} />
              Enrolled Students ({enrolledStudents.length})
            </h3>
            <p>Students currently enrolled in this curriculum program</p>
          </div>
        </div>
        <div className="card-body">
          {enrolledStudents.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 20 }}>
              No students are directly registered in this specific course title yet.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Academic Year</th>
                    <th>Attendance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((student) => (
                    <tr key={student.id}>
                      <td><strong>{student.id}</strong></td>
                      <td style={{ fontWeight: 600 }}>{student.fullName}</td>
                      <td>{student.email}</td>
                      <td>{student.academicYear || "3rd Year"}</td>
                      <td>
                        <span
                          className={`custom-badge ${
                            student.attendancePercentage >= 85
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {student.attendancePercentage}%
                        </span>
                      </td>
                      <td>
                        <Link to={`/students/${student.id}`} className="forgot-link" style={{ fontWeight: 600 }}>
                          View Student
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
