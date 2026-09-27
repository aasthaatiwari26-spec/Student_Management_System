import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  X,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmModal from "../../components/ConfirmModal";

function NoticeList() {
  const { notices, deleteNotice } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewNoticeModal, setViewNoticeModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categories = ["Academic", "Examination", "Event", "Holiday", "General"];

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "All" || n.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Campus Notice Board ({filteredNotices.length})</h2>
            <p>Official circulars, exam notifications, holiday schedules, and campus events</p>
          </div>
          <Link to="/notices/create" className="primary-btn" style={{ width: "auto" }}>
            <PlusCircle size={16} />
            <span>Create Notice</span>
          </Link>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search notices by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters-group">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notices Grid */}
          {filteredNotices.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              No notices found matching your criteria.
            </div>
          ) : (
            <div className="notices-grid">
              {filteredNotices.map((notice) => (
                <div key={notice.id} className="notice-card">
                  <div className="notice-badge-row">
                    <span
                      className={`custom-badge ${
                        notice.priority === "High"
                          ? "badge-danger"
                          : notice.category === "Examination"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span className="notice-date">{notice.date}</span>
                  </div>

                  <h3 className="notice-title">{notice.title}</h3>
                  <p className="notice-description">{notice.description}</p>

                  <div className="notice-footer">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      By: <strong>{notice.author || "Administration"}</strong>
                    </span>

                    <div className="table-actions">
                      <button
                        type="button"
                        className="action-btn view"
                        title="View Full Notice"
                        onClick={() => setViewNoticeModal(notice)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        className="action-btn edit"
                        title="Edit Notice"
                        onClick={() => navigate(`/notices/edit/${notice.id}`)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        className="action-btn delete"
                        title="Delete Notice"
                        onClick={() => setDeleteTarget(notice)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Notice Detail Modal */}
      {viewNoticeModal && (
        <div className="modal-overlay" onClick={() => setViewNoticeModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="custom-badge badge-info">{viewNoticeModal.category}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{viewNoticeModal.date}</span>
              </div>
              <button onClick={() => setViewNoticeModal(null)} className="action-btn">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 12, color: "var(--text-primary)" }}>
                {viewNoticeModal.title}
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                {viewNoticeModal.description}
              </p>
              <div style={{ marginTop: 20, paddingTop: 12, borderTop: "1px solid var(--border-color)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Published by: <strong>{viewNoticeModal.author || "College Authority"}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setViewNoticeModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Notice"
        message={`Are you sure you want to remove the notice "${deleteTarget?.title}"?`}
        confirmText="Yes, Delete Notice"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteNotice(deleteTarget.id);
          }
        }}
      />
    </div>
  );
}

export default NoticeList;
