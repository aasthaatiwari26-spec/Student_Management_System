import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" },
});

const attendanceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => `ATT-${Date.now()}`,
    },
    date: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: "General Session",
    },
    records: [attendanceRecordSchema],
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
