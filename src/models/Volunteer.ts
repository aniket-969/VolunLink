import mongoose, { Schema, Document, mongo } from "mongoose";
import UserModel from "./User";

interface Location {
  type: "Point";
  coordinates: [number, number];
  country?: string;
  county?: string;
  road?: string;
  state?: string;
  village?: string;
}

export interface VolunteerForm extends Document {
  createdBy: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  location:Location;
  images: string[];
  contactEmail: string;
  contactPhone?: string;
  startDate?: Date;
  endDate?: Date;
  role: string;
  skills?: mongoose.Schema.Types.ObjectId;
  category?: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

// VolunteerForm Schema
const VolunteerFormSchema: Schema<VolunteerForm> = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },    
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      country: String,
      county: String,
      road: String,
      state: String,
      village: String,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["Volunteer", "Organization"],
      required: true,
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
    },
    expiresAt: {
      type: Date,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OpportunityCategory",
    },
  },
  {
    timestamps: true,
  }
);

VolunteerFormSchema.index({createdBy:1});
VolunteerFormSchema.index({"location.coordinates":"2dsphere"});
VolunteerFormSchema.index({startDate:1,endDate:1});

const VolunteerFormModel =
  (mongoose.models.VolunteerForm as mongoose.Model<VolunteerForm>) ||
  mongoose.model<VolunteerForm>("VolunteerForm", VolunteerFormSchema);

export default VolunteerFormModel;
