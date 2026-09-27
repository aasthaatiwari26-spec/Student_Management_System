import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, updateCourse, faculty } = useData();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const course = getCourseById(id);
    if (course) {
      setFormData(course);
    }
  }, [id, getCourseById]);

  if (!formData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Course not found.</p>
          <Link to="/courses" className="btn-secondary" style={{ marginTop: 12 }}>
            Back to Courses
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

    if (!formData.name || !formData.department || !formData.duration) {
      setError("Please fill out all required fields.");
      return;
    }

    updateCourse(id, formData);
    navigate(`/courses/${id}`);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to={`/courses/${id}`} className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Course Details</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Edit Course</h2>
            <p>Update curriculum parameters for {formData.name} ({formData.id})</p>
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
                <label>Course ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  disabled
                  style={{ background: "#f8fafc", cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label>Course Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                <label>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Credits</label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits || 4}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Assigned Faculty</label>
                <select
                  name="assignedFaculty"
                  value={formData.assignedFaculty}
                  onChange={handleChange}
                >
                  <option value="Not Assigned">Not Assigned</option>
                  {faculty.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name} ({f.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group form-grid-full">
                <label>Description & Syllabus</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to={`/courses/${id}`} className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Update Course</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
