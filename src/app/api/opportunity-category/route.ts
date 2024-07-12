import dbConnect from "@/lib/dbConnect";
import OpportunityCategoryModel from "@/models/OpportunityCategory";

export async function POST(request: Request) {
    await dbConnect();
  
  const body = await request.json();
    
    console.log("This is upcoming field", body); 
    try {
      
      const {
       categoryName,
       categoryDescription
      } = body;
      
  
      const OpportunityCategoryData = new OpportunityCategoryModel({
        categoryName,
        categoryDescription
      });
      console.log(OpportunityCategoryData);
      await OpportunityCategoryData.save();
  
      return new Response(
          JSON.stringify({
            success: true,
            message: "Opportunity category inserted successfully",
            data:OpportunityCategoryData
          }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
      console.error("Error inserting opportunity category :", error);
      return new Response(
          JSON.stringify({
            success: false,
            message: "Error submitting opportunity category data",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
  }

