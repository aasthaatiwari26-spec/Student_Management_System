import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Award,
  Calendar,
  Layers,
} from "lucide-react";
import { useData } from "../../context/DataContext";

function FacultyProfile() {
  const { id } = useParams();
  const { getFacultyById, courses } = useData();

  const faculty = getFacultyById(id);

  if (!faculty) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Faculty member not found.</p>
          <Link to="/faculty" className="btn-secondary" style={{ marginTop: 12 }}>
            Back to Faculty List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/faculty" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Faculty</span>
        </Link>
        <Link to={`/faculty/edit/${faculty.id}`} className="primary-btn" style={{ width: "auto" }}>
          <Edit size={16} />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="profile-hero" style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
        <div className="profile-avatar-large" style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>
          <GraduationCap size={36} />
        </div>
        <div className="profile-info">
          <h1>{faculty.name}</h1>
          <p>{faculty.department} • ID: {faculty.id}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <span className="custom-badge badge-success">{faculty.status || "Active"}</span>
            <span className="custom-badge badge-info">{faculty.experience || "10+ Years Exp"}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {/* Personal Details & Department */}
        <div className="card">
          <div className="card-header">
            <h3>
              <Award size={18} style={{ color: "var(--primary)" }} />
              Personal & Academic Details
            </h3>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{faculty.name}</p>
              </div>
              <div className="info-item">
                <label>Faculty ID</label>
                <p>{faculty.id}</p>
              </div>
              <div className="info-item">
                <label>Department</label>
                <p>{faculty.department}</p>
              </div>
              <div className="info-item">
                <label>Qualification</label>
                <p>{faculty.qualification || "Ph.D."}</p>
              </div>
              <div className="info-item">
                <label>Experience</label>
                <p>{faculty.experience || "8+ Years"}</p>
              </div>
              <div className="info-item">
                <label>Status</label>
                <p>{faculty.status || "Active"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="card">
          <div className="card-header">
            <h3>
              <Phone size={18} style={{ color: "var(--secondary)" }} />
              Contact Details
            </h3>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item" style={{ gridColumn: "span 2" }}>
                <label>Official Email</label>
                <p>{faculty.email}</p>
              </div>
              <div className="info-item" style={{ gridColumn: "span 2" }}>
                <label>Contact Phone</label>
                <p>{faculty.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Courses */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div className="card-header">
            <h3>
              <BookOpen size={18} style={{ color: "var(--info)" }} />
              Assigned Courses & Curriculum
            </h3>
          </div>
          <div className="card-body">
            {!faculty.assignedCourses || faculty.assignedCourses.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No courses currently assigned to this faculty member.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {faculty.assignedCourses.map((cName, idx) => {
                  const matchCourse = courses.find((c) => c.name === cName);
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: 18,
                        background: "#f8fafc",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{cName}</h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 12 }}>
                        {matchCourse ? `${matchCourse.duration} • ${matchCourse.credits || 4} Credits` : "Standard Course"}
                      </p>
                      {matchCourse && (
                        <Link to={`/courses/${matchCourse.id}`} className="forgot-link" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                          View Syllabus & Roster &rarr;
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyProfile;
