import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function EditFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFacultyById, updateFaculty } = useData();

  const [formData, setFormData] = useState(null);
  const [courseInput, setCourseInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const member = getFacultyById(id);
    if (member) {
      setFormData({
        ...member,
        assignedCourses: member.assignedCourses || [],
      });
    }
  }, [id, getFacultyById]);

  if (!formData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Faculty member not found.</p>
          <Link to="/faculty" className="btn-secondary" style={{ marginTop: 12 }}>
            Back to Faculty
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

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (courseInput.trim()) {
      setFormData({
        ...formData,
        assignedCourses: [...formData.assignedCourses, courseInput.trim()],
      });
      setCourseInput("");
    }
  };

  const handleRemoveCourse = (index) => {
    setFormData({
      ...formData,
      assignedCourses: formData.assignedCourses.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.department) {
      setError("Please fill out all required fields.");
      return;
    }

    updateFaculty(id, formData);
    navigate(`/faculty/${id}`);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to={`/faculty/${id}`} className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Profile</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Edit Faculty Information</h2>
            <p>Update credentials for {formData.name} ({formData.id})</p>
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
              <div className="form-group">
                <label>Faculty ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  disabled
                  style={{ background: "#f8fafc", cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <div className="form-group">
                <label>Department *</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>

              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Teaching Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status || "Active"} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div className="form-group form-grid-full">
                <label>Assigned Courses</label>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    placeholder="Enter course name"
                  />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleAddCourse}
                  >
                    Add
                  </button>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {formData.assignedCourses.map((c, idx) => (
                    <span
                      key={idx}
                      className="custom-badge badge-neutral"
                      style={{ padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCourse(idx)}
                        style={{ color: "var(--danger)", fontWeight: "bold" }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Link to={`/faculty/${id}`} className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Update Faculty Information</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFaculty;
