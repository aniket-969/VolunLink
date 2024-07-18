import VolunteerFormModel from "@/models/Volunteer";
import dbConnect from "../dbConnect";
import UserModel from "@/models/User";
import OpportunityCategoryModel from "@/models/OpportunityCategory";
import SkillsModel from "@/models/Skills";

export async function getPosts(page = 1, limit = 5,filter:string,latitude?:number,longitude?:number) {
  await dbConnect();

  UserModel;
  OpportunityCategoryModel;
  SkillsModel;
  try {
    const skip = (page - 1) * limit;
console.log(latitude,longitude)
let query: any ={}
if (filter === "Volunteers Only") {
  query.role = "Volunteer";
} else if (filter === "Organization Only") {
  query.role = "Organization";
}else if (filter === "Nearest" && latitude !== undefined && longitude !== undefined) {
  query.location = {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      $maxDistance: 50000 
  
    },
  };
}


let sort: any = {};
if (filter === "Latest") {
  sort.createdAt = -1; // Sort by creation date in descending order
}
    const VolunteersData = await VolunteerFormModel.find(query)
      .populate("createdBy", "username ")
      .populate("category", "categoryName categoryDescription")
      .populate("skills", "skillName skillDescription")
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
      console.log("This is query",query)
    const posts = JSON.parse(JSON.stringify(VolunteersData));
    console.log(posts,filter)
    return { posts };
  } catch (error) {
    console.error("Error fetching volunteer data:", error);
    return { error };
  }
}
export async function getUserPosts(page = 1, limit = 5,userId:string) {
  await dbConnect();

  UserModel;
  OpportunityCategoryModel;
  SkillsModel;
  try {
    const skip = (page - 1) * limit;
    const userPosts = await VolunteerFormModel.find({ createdBy: userId })
      .populate("createdBy", "username ")
      .populate("category", "categoryName categoryDescription")
      .populate("skills", "skillName skillDescription")
      .skip(skip)
      .limit(limit)
      .exec();
     
    const posts = JSON.parse(JSON.stringify(userPosts));
    return { posts };
  } catch (error) {
    console.error("Error fetching volunteer data:", error);
    return { error };
  }
}
