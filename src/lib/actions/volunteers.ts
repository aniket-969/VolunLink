"use server"
import { getPosts } from "../mongo/posts"

export async function fetchPosts(page = 1, limit = 5) {
  const{posts} = await getPosts(page,limit)
  return posts
}
