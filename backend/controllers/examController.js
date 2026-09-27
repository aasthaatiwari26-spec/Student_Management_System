import mongoose from "mongoose";
import Exam from "../models/Exam.js";
import Mark from "../models/Mark.js";

// Helper for Grade calculation
function calculateGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

// @desc Get all exams
export async function getExams(req, res) {
  try {
    const exams = await Exam.find().sort({ date: 1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exams" });
  }
}

// @desc Create exam
export async function createExam(req, res) {
  try {
    const { id, name, course, subject, date, totalMarks, passingMarks } = req.body;
    const examId = id || `EXM-${Math.floor(100 + Math.random() * 900)}`;

    const newExam = await Exam.create({
      id: examId,
      name,
      course,
      subject,
      date,
      totalMarks: totalMarks || 100,
      passingMarks: passingMarks || 40,
    });

    res.status(201).json(newExam);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create exam" });
  }
}

// @desc Update exam
export async function updateExam(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const exam = await Exam.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(400).json({ message: "Failed to update exam" });
  }
}

// @desc Delete exam
export async function deleteExam(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const exam = await Exam.findOneAndDelete(query);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Also remove any marks associated with this exam
    await Mark.deleteMany({ $or: [{ examId: req.params.id }, { examId: exam.id }] });

    res.json({ message: "Exam and associated marks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete exam" });
  }
}

// @desc Get all marks
export async function getMarks(req, res) {
  try {
    const marks = await Mark.find().sort({ createdAt: -1 });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch marks" });
  }
}

// @desc Save batch marks
export async function saveMarks(req, res) {
  try {
    const { examId, studentMarksList } = req.body;
    const exam = await Exam.findOne({ id: examId });
    const totalMarks = exam ? exam.totalMarks : 100;

    const savedRecords = [];

    for (const item of studentMarksList) {
      const marksObtained = Number(item.marksObtained);
      const percentage = Math.round((marksObtained / totalMarks) * 100);
      const grade = calculateGrade(percentage);
      const resultStatus = percentage >= 40 ? "Pass" : "Fail";

      // Upsert: update existing or create new mark entry
      const record = await Mark.findOneAndUpdate(
        { examId, studentId: item.studentId },
        {
          id: `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          examId,
          examName: exam ? exam.name : "Exam",
          studentId: item.studentId,
          studentName: item.studentName,
          course: exam ? exam.course : "",
          subject: exam ? exam.subject : "",
          marksObtained,
          totalMarks,
          percentage,
          grade,
          resultStatus,
        },
        { upsert: true, new: true }
      );
      savedRecords.push(record);
    }

    res.status(200).json({ success: true, records: savedRecords });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to save marks" });
  }
}

// @desc Update single mark
export async function updateSingleMark(req, res) {
  try {
    const { id } = req.params;
    const { marksObtained, totalMarks } = req.body;

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const existing = await Mark.findOne(query);
    if (!existing) return res.status(404).json({ message: "Result record not found" });

    const newMarksObtained = marksObtained !== undefined ? Number(marksObtained) : existing.marksObtained;
    const newTotalMarks = totalMarks !== undefined ? Number(totalMarks) : existing.totalMarks;
    const percentage = Math.round((newMarksObtained / newTotalMarks) * 100);
    const grade = calculateGrade(percentage);
    const resultStatus = percentage >= 40 ? "Pass" : "Fail";

    existing.marksObtained = newMarksObtained;
    existing.totalMarks = newTotalMarks;
    existing.percentage = percentage;
    existing.grade = grade;
    existing.resultStatus = resultStatus;
    await existing.save();

    res.json(existing);
  } catch (error) {
    res.status(400).json({ message: "Failed to update mark record" });
  }
}
