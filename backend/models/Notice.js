import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => `NOT-${Date.now()}`,
    },
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Notice description is required"],
    },
    category: {
      type: String,
      enum: ["Academic", "Examination", "Event", "Holiday", "General"],
      default: "Academic",
    },
    priority: {
      type: String,
      enum: ["Low", "Normal", "High"],
      default: "Normal",
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    author: {
      type: String,
      default: "Dean of Academics",
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
