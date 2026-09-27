import Attendance from "../models/Attendance.js";

export async function getAttendance(req, res) {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance records" });
  }
}

export async function saveAttendance(req, res) {
  try {
    const { date, course, subject, records } = req.body;

    const newAttendance = await Attendance.create({
      id: `ATT-${Date.now()}`,
      date,
      course,
      subject: subject || "General Session",
      records: records || [],
    });

    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to record attendance" });
  }
}
