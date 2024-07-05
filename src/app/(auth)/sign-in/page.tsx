'use client';
import { useSession,signIn,signOut } from "next-auth/react";

const page = () => {
  const{data:session} = useSession()
  console.log(session)
    return (
    <div>dfs</div>
  )
  
  
}

export default page