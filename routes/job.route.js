import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, getJobById, getJobsByrecruiter, postJob } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/postjob").post(isAuthenticated, postJob);
router.route("/allJobs").get(isAuthenticated, getAllJobs);
router.route("/get/recruiter/jobs").get(isAuthenticated, getJobsByrecruiter);
router.route("/getjob/:id").get(isAuthenticated, getJobById);
export default router