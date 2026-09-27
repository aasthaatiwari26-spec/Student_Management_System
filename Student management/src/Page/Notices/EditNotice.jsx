import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function EditNotice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notices, updateNotice } = useData();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const notice = notices.find((n) => n.id === id);
    if (notice) {
      setFormData(notice);
    }
  }, [id, notices]);

  if (!formData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Notice not found.</p>
          <Link to="/notices" className="btn-secondary" style={{ marginTop: 12 }}>
            Back to Notices
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

    if (!formData.title || !formData.description || !formData.date) {
      setError("Please fill out all required fields.");
      return;
    }

    updateNotice(id, formData);
    navigate("/notices");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/notices" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Notices</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Edit Notice</h2>
            <p>Update circular bulletin information</p>
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
              <div className="form-group form-grid-full">
                <label>Notice Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Event">Event</option>
                  <option value="Holiday">Holiday</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label>Publish Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <select name="priority" value={formData.priority || "Normal"} onChange={handleChange}>
                  <option value="Normal">Normal</option>
                  <option value="High">High Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div className="form-group">
                <label>Issuing Authority / Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group form-grid-full">
                <label>Description *</label>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/notices" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Update Notice</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNotice;
