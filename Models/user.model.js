import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      reuired: true,
      enum: ["student", "recruiter"],
    },
    profile: {
      bio: { type: String },
      skills: [{
        type: String,
      }],
      qualifiaction: {
        type: String,
      
      },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
 
  },
  { timestapms: true }
);
export const User = mongoose.model("User", userSchema);
