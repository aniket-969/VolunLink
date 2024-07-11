import mongoose, { Schema, Document } from "mongoose";

export interface OpportunityCategory extends Document {
  categoryName:string;
  description:string;

}

const OpportunityCategorySchema: Schema<OpportunityCategory> = new mongoose.Schema(
  {
    categoryName: {
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

OpportunityCategorySchema.index({ categoryName: 1 });

const OpportunityCategoryModel =
  (mongoose.models.OpportunityCategory as mongoose.Model<OpportunityCategory>) ||
  mongoose.model<OpportunityCategory>("OpportunityCategory", OpportunityCategorySchema);

export default OpportunityCategoryModel;