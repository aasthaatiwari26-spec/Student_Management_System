import express from "express";
import { getAttendance, saveAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.route("/").get(getAttendance).post(saveAttendance);

export default router;
