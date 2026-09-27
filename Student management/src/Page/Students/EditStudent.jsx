import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent, courses } = useData();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const student = getStudentById(id);
    if (student) {
      setFormData(student);
    }
  }, [id, getStudentById]);

  if (!formData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Student not found.</p>
          <Link to="/students" className="btn-secondary" style={{ marginTop: 12 }}>
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    updateStudent(id, formData);
    navigate(`/students/${id}`);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to={`/students/${id}`} className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Profile</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Edit Student Information</h2>
            <p>Update student records for {formData.fullName} ({formData.id})</p>
          </div>
        </div>

        <div className="card-body">
          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Student ID (read-only) */}
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  disabled
                  style={{ background: "#f8fafc", cursor: "not-allowed" }}
                />
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Course */}
              <div className="form-group">
                <label>Course</label>
                <select name="course" value={formData.course} onChange={handleChange}>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="form-group">
                <label>Enrollment Status</label>
                <select name="status" value={formData.status || "Active"} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Graduated">Graduated</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              {/* Address */}
              <div className="form-group form-grid-full">
                <label>Residential Address</label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to={`/students/${id}`} className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Update Student Information</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
