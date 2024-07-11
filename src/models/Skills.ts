import mongoose, { Schema, Document } from "mongoose";

export interface Skills extends Document {
  skillName:string;
  description:string;

}


const SkillsSchema: Schema<Skills> = new mongoose.Schema(
  {
    skillName: {
      type: String, 
      required: true,
      
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SkillsSchema.index({ skillName: 1 });

const SkillsModel =
  (mongoose.models.Skills as mongoose.Model<Skills>) ||
  mongoose.model<Skills>("Skills", SkillsSchema);

export default SkillsModel;
