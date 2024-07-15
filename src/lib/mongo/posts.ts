import VolunteerFormModel from "@/models/Volunteer";
import dbConnect from "../dbConnect";
import UserModel from "@/models/User";
import OpportunityCategoryModel from "@/models/OpportunityCategory";
import SkillsModel from "@/models/Skills";

export async function getPosts(page = 1, limit = 5) {
  await dbConnect();

  UserModel;
  OpportunityCategoryModel;
  SkillsModel;
  try {
    const skip = (page - 1) * limit;
    const VolunteersData = await VolunteerFormModel.find()
      .populate("createdBy", "username ")
      .populate("category", "categoryName categoryDescription")
      .populate("skills", "skillName skillDescription")
      .skip(skip)
      .limit(limit)
      .exec();
    const posts = JSON.parse(JSON.stringify(VolunteersData));
    return { posts };
  } catch (error) {
    console.error("Error fetching volunteer data:", error);
    return { error };
  }
}
