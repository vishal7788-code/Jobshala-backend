import { Company } from "../Models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Please provide comapny name",
        success:false,
      });
    } else {
      let company = await Company.findOne({
        name: companyName,
      });
      if (company) {
        return res.status(400).json({
          message: "Company name already exist",
          success:false,
        });
      } else {
        await Company.create({
          name: companyName,
          userId: req.id,
        });
        return res.status(201).json({
          message: "Company registered successfully",
          companyName,
          success:true,
        });
      }
    }
  } catch (error) {
    console.error("error in company registration", error.message);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success:false,
      });
    }else{
        return res.status(200).json({
            companies,
            success:true,
        })
    }
  } catch (error) {
    console.error("error in getting company", error.message);
  }
};

//get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not Found.",
        success:false,
      });
    } else {
      return res.status(200).json({
        company,
        success:true,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h get company bt id se", error.message);
  }
};

//update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudinary aayega idhar
    const updateCompany = { name, description, website, location };
    const companyId = await Company.findByIdAndUpdate(
      req.params.id,
      updateCompany,
      { new: true }
    );

    if (!companyId) {
      return res.status(404).json({
        message: "Company not found",
        success:false,
      });
    } else {
      return res.status(200).json({
        message: "Company updated successfully.",
        success:true,
      });
    }
  } catch (error) {
    console.error("ye error aa rha h update company se", error.message);
  }
};
