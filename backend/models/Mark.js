import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    },
    examId: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      default: "Exam",
    },
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      default: "",
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      default: 100,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      default: "B",
    },
    resultStatus: {
      type: String,
      enum: ["Pass", "Fail"],
      default: "Pass",
    },
  },
  {
    timestamps: true,
  }
);

const Mark = mongoose.model("Mark", markSchema);
export default Mark;
