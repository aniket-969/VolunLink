
import PostFeed from "@/components/PostFeed";
import { fetchPosts } from "@/lib/actions/volunteers";

export default async function Home() {
  const data = await fetchPosts()


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostFeed initialPosts={data} />

    </main>
  );
}