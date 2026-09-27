import express from "express";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

router.route("/").get(getNotices).post(createNotice);
router.route("/:id").put(updateNotice).delete(deleteNotice);

export default router;
