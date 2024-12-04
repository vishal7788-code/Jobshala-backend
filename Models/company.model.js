import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true,
    },
    description: {
      type: String,
      
    },
    website: {
      type: String,
    },
    location: {
      type: String,
      
    },
    logo: {
      type: String, //url for logo
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", companySchema);
