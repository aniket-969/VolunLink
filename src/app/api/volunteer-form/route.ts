import dbConnect from "@/lib/dbConnect";
import VolunteerFormModel from "@/models/Volunteer";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  const body = await request.json();
  const userId = new mongoose.Types.ObjectId(_user._id);
  console.log("This is upcoming field", body);
  try {
    const {
      title,
      description,
      email: contactEmail,
      phone: contactPhone,
      availableFrom: startDate,
      availableTill: endDate,
      role,
      skills,
      category,
      images,
      location,
    } = body;
    
console.log("This is skill",skills)
console.log("This is category",category)
    const volunteerFormData = new VolunteerFormModel({
      title,
      description,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(location.longitude),
          parseFloat(location.latitude),
        ],
        country: location.country,
        county: location.county,
        road: location.road,
        state: location.state,
        village: location.village,
        state_district: location.state_district,
      },
      contactEmail,
      contactPhone,
      startDate,
      endDate,
      images,
      role,
      skills,
      category,
      createdBy: userId,
    });
    console.log(volunteerFormData);
    await volunteerFormData.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Volunteer Form submitted successfully",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error submitting volunteer form",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
