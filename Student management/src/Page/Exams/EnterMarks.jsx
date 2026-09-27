import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Save, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useData } from "../../context/DataContext";

function EnterMarks() {
  const navigate = useNavigate();
  const { exams, students, saveExamMarks, marks } = useData();

  const [selectedExamId, setSelectedExamId] = useState(
    exams.length > 0 ? exams[0].id : ""
  );
  const [marksState, setMarksState] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const selectedExam = exams.find((e) => e.id === selectedExamId);

  // Eligible students based on exam's course
  const eligibleStudents = selectedExam
    ? students.filter(
        (s) => s.course.toLowerCase() === selectedExam.course.toLowerCase()
      )
    : [];

  useEffect(() => {
    if (!selectedExam) return;

    // Pre-populate if student already has marks recorded for this exam
    const map = {};
    eligibleStudents.forEach((student) => {
      const existing = marks.find(
        (m) => m.examId === selectedExam.id && m.studentId === student.id
      );
      map[student.id] = existing ? existing.marksObtained : "";
    });
    setMarksState(map);
  }, [selectedExamId, marks]);

  const handleMarkInput = (studentId, val) => {
    setMarksState((prev) => ({
      ...prev,
      [studentId]: val,
    }));
    setErrorMsg("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!selectedExam) {
      setErrorMsg("Please select a valid examination.");
      return;
    }

    if (eligibleStudents.length === 0) {
      setErrorMsg("No students found in this course to grade.");
      return;
    }

    const payload = [];
    for (const student of eligibleStudents) {
      const val = marksState[student.id];
      if (val === "" || val === undefined) {
        continue;
      }
      const numVal = Number(val);
      if (numVal < 0 || numVal > selectedExam.totalMarks) {
        setErrorMsg(`Marks for ${student.fullName} must be between 0 and ${selectedExam.totalMarks}.`);
        return;
      }
      payload.push({
        studentId: student.id,
        studentName: student.fullName,
        marksObtained: numVal,
      });
    }

    if (payload.length === 0) {
      setErrorMsg("Please enter marks for at least one student before saving.");
      return;
    }

    saveExamMarks(selectedExam.id, payload);
    setSuccessMsg(`Marks for ${selectedExam.name} successfully saved!`);
    setTimeout(() => {
      navigate("/exams/results");
    }, 1500);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/exams" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Exams</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Enter Examination Marks</h2>
            <p>Score student assessments and record performance grades</p>
          </div>
          <Link to="/exams/results" className="btn-secondary">
            View Results Sheet
          </Link>
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

          {/* Exam Selector */}
          <div className="form-grid" style={{ marginBottom: 24 }}>
            <div className="form-group form-grid-full">
              <label>Select Scheduled Exam *</label>
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
              >
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} - {exam.subject} ({exam.course}) [Max: {exam.totalMarks} Marks]
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedExam && (
            <div
              style={{
                background: "#f8fafc",
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                marginBottom: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <strong style={{ color: "var(--text-primary)" }}>{selectedExam.subject}</strong>
                <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>({selectedExam.course})</span>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: "0.85rem" }}>
                <span>Date: <strong>{selectedExam.date}</strong></span>
                <span>Maximum Marks: <strong>{selectedExam.totalMarks}</strong></span>
              </div>
            </div>
          )}

          {/* Students Roster to input marks */}
          {eligibleStudents.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
              No students enrolled in {selectedExam?.course || "this course"}.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Max Marks</th>
                    <th>Marks Scored</th>
                    <th>Calculated %</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibleStudents.map((student) => {
                    const enteredVal = marksState[student.id];
                    const numVal = Number(enteredVal);
                    const hasVal = enteredVal !== "" && enteredVal !== undefined;
                    const pct = hasVal && selectedExam ? Math.round((numVal / selectedExam.totalMarks) * 100) : null;

                    return (
                      <tr key={student.id}>
                        <td><strong>{student.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{student.fullName}</td>
                        <td>{student.course}</td>
                        <td>{selectedExam?.totalMarks || 100}</td>
                        <td style={{ width: 140 }}>
                          <input
                            type="number"
                            min={0}
                            max={selectedExam?.totalMarks || 100}
                            placeholder="0"
                            value={enteredVal !== undefined ? enteredVal : ""}
                            onChange={(e) => handleMarkInput(student.id, e.target.value)}
                            style={{ width: "100%", padding: "6px 10px" }}
                          />
                        </td>
                        <td>
                          {pct !== null ? (
                            <span
                              className={`custom-badge ${
                                pct >= 40 ? "badge-success" : "badge-danger"
                              }`}
                            >
                              {pct}% {pct >= 40 ? "Pass" : "Fail"}
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Unscored</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="form-actions">
            <Link to="/exams" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="button"
              className="primary-btn"
              style={{ width: "auto" }}
              onClick={handleSave}
              disabled={eligibleStudents.length === 0}
            >
              <Save size={16} />
              <span>Save Marks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterMarks;
