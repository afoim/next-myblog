import { getAllPosts } from '@/lib/posts'
import PostList from './PostList'

export default async function PostsPage() {
  const posts = await getAllPosts()
  return <PostList initialPosts={posts} />
}
