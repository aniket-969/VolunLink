"use server"
import UserModel from "@/models/User"
import dbConnect from "../dbConnect"
import { getPosts, getUserPosts } from "../mongo/posts"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import mongoose from "mongoose"
import { User } from "@/models/User";

export async function fetchPosts(page = 1, limit = 5,filter:string="default",latitude?:number,longitude?:number) {
  const{posts} = await getPosts(page,limit,filter,latitude,longitude)
  return posts
}

export async function fetchUserPosts(page =1,limit=5,userId:string){
  const {posts} = await getUserPosts(page,limit,userId)
  
  return posts
}

export async function updateUser({
 
    fullName,
    path,
    username,
    avatar,
  }: {
   
    fullName?: string;
    username?: string;
    avatar?: string;
    path?:string;
  }) {
    
    try {
      dbConnect()
      const session = await getServerSession(authOptions);
      const _user: User = session?.user;
    
      if (!session || !_user) {
        throw new Error("user not authenticated")
      }
      const userId = new mongoose.Types.ObjectId(_user._id as string);
    const updatedUser =  await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          username: username?.toLowerCase(),
          fullName,
          avatar,
          
        },
        { new: true }
      );
      
      console.log(session)
   
  if(!updatedUser){
    throw new Error("user not found")
  }
      if (path === `/profile/${userId}`) {
        revalidatePath(path);
      }
      const { username: updatedUsername, avatar: updatedAvatar, fullName: updatedFullName } = updatedUser;
      return { username: updatedUsername, avatar: updatedAvatar, fullName: updatedFullName };
    } catch (error: any) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }

  