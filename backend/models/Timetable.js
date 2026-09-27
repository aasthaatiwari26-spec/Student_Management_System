import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => `TT-${Date.now()}`,
    },
    day: {
      type: String,
      required: true,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    time: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    classroom: {
      type: String,
      default: "Room 101",
    },
  },
  {
    timestamps: true,
  }
);

const Timetable = mongoose.model("Timetable", timetableSchema);
export default Timetable;
