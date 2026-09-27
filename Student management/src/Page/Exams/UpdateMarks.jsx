import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, CheckCircle2, Edit } from "lucide-react";
import { useData } from "../../context/DataContext";

function UpdateMarks() {
  const navigate = useNavigate();
  const { marks, updateSingleMark } = useData();

  const [editingId, setEditingId] = useState(null);
  const [editedScore, setEditedScore] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const startEdit = (record) => {
    setEditingId(record.id);
    setEditedScore(record.marksObtained);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSaveSingle = (record) => {
    const num = Number(editedScore);
    if (isNaN(num) || num < 0 || num > record.totalMarks) {
      setErrorMsg(`Score must be a number between 0 and ${record.totalMarks}.`);
      return;
    }

    updateSingleMark(record.id, { marksObtained: num });
    setEditingId(null);
    setSuccessMsg(`Marks updated successfully for ${record.studentName}!`);
  };

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/exams/results" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Results</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Update Student Marks</h2>
            <p>Revise or re-evaluate existing scores for students</p>
          </div>
        </div>

        <div className="card-body">
          {errorMsg && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="success-alert">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Exam Name</th>
                  <th>Subject</th>
                  <th>Score / Max</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Edit Score</th>
                </tr>
              </thead>
              <tbody>
                {marks.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No marks entries available to update.
                    </td>
                  </tr>
                ) : (
                  marks.map((m) => (
                    <tr key={m.id}>
                      <td><strong>{m.studentId}</strong></td>
                      <td style={{ fontWeight: 600 }}>{m.studentName}</td>
                      <td>{m.examName}</td>
                      <td>{m.subject}</td>
                      <td>
                        {editingId === m.id ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="number"
                              min={0}
                              max={m.totalMarks}
                              value={editedScore}
                              onChange={(e) => setEditedScore(e.target.value)}
                              style={{ width: 70, padding: "4px 8px" }}
                            />
                            <span>/ {m.totalMarks}</span>
                          </div>
                        ) : (
                          <span><strong>{m.marksObtained}</strong> / {m.totalMarks}</span>
                        )}
                      </td>
                      <td>
                        <span className="custom-badge badge-info">{m.grade}</span>
                      </td>
                      <td>
                        <span
                          className={`custom-badge ${
                            m.resultStatus === "Pass" ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {m.resultStatus}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {editingId === m.id ? (
                          <div style={{ display: "inline-flex", gap: 6 }}>
                            <button
                              type="button"
                              className="primary-btn"
                              style={{ width: "auto", padding: "4px 10px", fontSize: "0.8rem" }}
                              onClick={() => handleSaveSingle(m)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                            onClick={() => startEdit(m)}
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMarks;
