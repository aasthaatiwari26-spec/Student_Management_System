import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Faculty email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Faculty phone is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    qualification: {
      type: String,
      default: "Ph.D.",
    },
    experience: {
      type: String,
      default: "8 Years",
    },
    assignedCourses: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Active", "On Leave"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
