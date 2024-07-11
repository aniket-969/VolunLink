import dbConnect from "@/lib/dbConnect";
import SkillsModel from "@/models/Skills";

export async function POST(request: Request) {
    await dbConnect();
  
  const body = await request.json();
    
    console.log("This is upcoming field", body); 
    try {
      
      const {
       skillName,
       description
      } = body;
      
  
      const skillFormData = new SkillsModel({
        skillName,
        description
      });
      console.log(skillFormData);
      await skillFormData.save();
  
      return new Response(
          JSON.stringify({
            success: true,
            message: "Skills inserted successfully",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
      console.error("Error inserting skills :", error);
      return new Response(
          JSON.stringify({
            success: false,
            message: "Error submitting skills data",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
  }

