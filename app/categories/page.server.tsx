import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import Categories from './page'

export default async function CategoriesPage() {
  const categories = await getAllCategories()
  const categorizedPosts = await Promise.all(
    categories.map(async category => ({
      category,
      posts: await getPostsByCategory(category)
    }))
  )
  
  return <Categories initialData={categorizedPosts} />
}
