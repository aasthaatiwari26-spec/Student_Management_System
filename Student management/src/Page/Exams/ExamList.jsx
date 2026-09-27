import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileSpreadsheet,
  PlusCircle,
  Eye,
  Trash2,
  Calendar,
  Award,
  CheckCircle,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmModal from "../../components/ConfirmModal";

function ExamList() {
  const { exams, deleteExam, marks } = useData();
  const navigate = useNavigate();

  const [deleteTarget, setDeleteTarget] = useState(null);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Examinations ({exams.length})</h2>
            <p>Schedule, manage exams, enter student marks, and review results</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/exams/create" className="primary-btn" style={{ width: "auto" }}>
              <PlusCircle size={16} />
              <span>Create Exam</span>
            </Link>
            <Link to="/exams/enter-marks" className="btn-secondary">
              <Award size={16} />
              <span>Enter Marks</span>
            </Link>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Exam ID</th>
                  <th>Exam Name</th>
                  <th>Course</th>
                  <th>Subject</th>
                  <th>Exam Date</th>
                  <th>Total Marks</th>
                  <th>Graded Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No exams scheduled yet.
                    </td>
                  </tr>
                ) : (
                  exams.map((exam) => {
                    const gradedRecords = marks.filter((m) => m.examId === exam.id).length;
                    return (
                      <tr key={exam.id}>
                        <td><strong>{exam.id}</strong></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{exam.name}</div>
                        </td>
                        <td>{exam.course}</td>
                        <td>{exam.subject}</td>
                        <td>
                          <span className="custom-badge badge-warning">{exam.date}</span>
                        </td>
                        <td><strong>{exam.totalMarks}</strong> Marks</td>
                        <td>
                          <span
                            className={`custom-badge ${
                              gradedRecords > 0 ? "badge-success" : "badge-neutral"
                            }`}
                          >
                            {gradedRecords > 0 ? `${gradedRecords} Graded` : "Pending Marks"}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="table-actions" style={{ justifyContent: "flex-end" }}>
                            <Link
                              to="/exams/results"
                              className="action-btn view"
                              title="View Exam Results"
                            >
                              <Eye size={16} />
                            </Link>
                            <button
                              type="button"
                              className="action-btn delete"
                              title="Delete Exam"
                              onClick={() => setDeleteTarget(exam)}
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

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Examination"
        message={`Are you sure you want to delete exam "${deleteTarget?.name}"? All associated student marks will also be deleted.`}
        confirmText="Yes, Delete Exam"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteExam(deleteTarget.id);
          }
        }}
      />
    </div>
  );
}

export default ExamList;
