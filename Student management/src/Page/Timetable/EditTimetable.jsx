import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function EditTimetable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timetable, updateTimetableEntry, courses, faculty } = useData();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const entry = timetable.find((t) => t.id === id);
    if (entry) {
      setFormData(entry);
    }
  }, [id, timetable]);

  if (!formData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: 40 }}>
          <p>Timetable entry not found.</p>
          <Link to="/timetable" className="btn-secondary" style={{ marginTop: 12 }}>
            Back to Timetable
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

    if (!formData.day || !formData.time || !formData.course || !formData.subject || !formData.faculty) {
      setError("Please fill out all required fields.");
      return;
    }

    updateTimetableEntry(id, formData);
    navigate("/timetable");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/timetable" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Timetable</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Edit Timetable Slot</h2>
            <p>Modify day, lecture hours, classroom, or faculty assignment</p>
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
                <label>Day of the Week *</label>
                <select name="day" value={formData.day} onChange={handleChange}>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Time Slot *</label>
                <select name="time" value={formData.time} onChange={handleChange}>
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Course *</label>
                <select name="course" value={formData.course} onChange={handleChange}>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Faculty Instructor *</label>
                <select name="faculty" value={formData.faculty} onChange={handleChange}>
                  {faculty.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name} ({f.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Classroom / Lab *</label>
                <input
                  type="text"
                  name="classroom"
                  value={formData.classroom || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/timetable" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Update Slot</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTimetable;
