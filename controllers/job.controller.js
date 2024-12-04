import { Job } from "../Models/job.model.js";
//create or post jobs
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      role,
      location,
      jobType,
      position,
      company,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !role||
      !location ||
      !jobType ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "Please fill all the fields.",
        success:false,
      });
    } else {
      const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary,
        role,
        location,
        jobType,
        position,
        company,
        created_by: userId,
      });
      return res.status(201).json({
        message: "job created successfully.",
        success: true,
        job,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h postJob se", error.message);
  }
};

// to get all created jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
   
      .populate({
        path: "company",
      })
      .sort({
        createdAt: -1,
      })
     
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        message:"Jobs fetched successfully.",
        success: true,
        jobs,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h getAllJobs se", error.message);
  }
};

//for student only // get job by id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
  
        path: "company",
    
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Job fetched successfully.",
        success:true,
        job,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h getJobById se", error.message);
  }
};

//for recruiter only..

export const getJobsByrecruiter = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ created_by: recruiterId });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Jobs fetched successfully.",
        success: true,
        jobs,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h getJobByrecruiter se", error.message);
  }
};
