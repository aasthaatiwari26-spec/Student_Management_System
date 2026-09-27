import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Exam name is required"],
      trim: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    date: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      default: 100,
    },
    passingMarks: {
      type: Number,
      default: 40,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
