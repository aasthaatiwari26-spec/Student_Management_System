import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    duration: {
      type: String,
      default: "4 Months",
    },
    credits: {
      type: Number,
      default: 4,
    },
    description: {
      type: String,
      default: "",
    },
    assignedFaculty: {
      type: String,
      default: "Not Assigned",
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
