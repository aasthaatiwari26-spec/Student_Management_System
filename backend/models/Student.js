import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Student full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Student phone is required"],
      trim: true,
    },
    dob: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    address: {
      type: String,
      default: "",
    },
    course: {
      type: String,
      required: [true, "Enrolled course is required"],
    },
    admissionDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    status: {
      type: String,
      enum: ["Active", "Graduated", "Suspended"],
      default: "Active",
    },
    academicYear: {
      type: String,
      default: "3rd Year",
    },
    semester: {
      type: String,
      default: "6th Semester",
    },
    attendancePercentage: {
      type: Number,
      default: 85,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
