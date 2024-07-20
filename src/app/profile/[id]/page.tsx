import { fetchUserPosts, updateUser } from "@/lib/actions/volunteers"
import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ProfileFeed from "@/components/ProfileFeed";

const Profile = async ({ params }: { params: { id: string } }) => {

  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  const data = await fetchUserPosts(1, 5, '669966fa242ddcbbbbcfe25d')

  return (
    <div>
      <div className='flex flex-col items-center gap-3 my-6 justify-center'>

        <img src="https://firebasestorage.googleapis.com/v0/b/typingtest-f4fb8.appspot.com/o/user-images%2F3Wifp0s6gPYywfGDnH10yBiKKeW2%2Fe6a29ea61841a4d7cac10435a57bcd5a.png?alt=media&token=9170a727-b371-4b0c-b8ff-99d1fec35d06" className=' image--cover h-[100px] w-[100px] bg-black' />

        <div className='flex justify-center items-center flex-col'>
          <p>Aniket Baranwal</p>
          <p>@aniket</p>

        </div>

      </div>
      <ProfileFeed initialPosts={data} />

    </div>


  )
}

export default Profile