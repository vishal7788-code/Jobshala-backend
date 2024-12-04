import { Application } from "../Models/application.model.js";
import { Job } from "../Models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "please provide job id.",
        success: false,
      });
    } //checking if job exists..
    else {
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
      if (existingApplication) {
        return res.status(400).json({
          message: "you have successfully applied for this job.",
          success: true,
        });
      }
    }

    //check if job exists or not...
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "job not found.",
        success: false,
      });
    }

    //create new application..
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "application created successffully.",
      success: true,
    });
  } catch (error) {
    console.error("ye error aa rha h applyForJob se", error.message);
  }
};
export const getApplications = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });

    if (!applications) {
      return res.status(404).json({
        message: "applications not found.",
        success: false,
      });
    } else {
      return res.status(200).json({
        applications,
        success: true,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h getApplications se", error.message);
  }
};
//for admin to get all applications..
export const getAllApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });
    if (!job) {
      return res.status(400).json({
        message: "job not found.",
        success: false,
      });
    } else {
      return res.status(200).json({
        job,
        success: true,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h getAllApplications se", error.message);
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "please provide status.",
        success: false,
      });
    }

    //find application by id..
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "application not found.",
        success: false,
      });
    }

    //update status..
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "status updated successfully.",
      sucess: true,
    });
  } catch (error) {
    console.error("ye error aa rha h updateStatus se", error.message);
  }
};
