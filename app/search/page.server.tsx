import { getAllCategories, getAllTags } from '@/lib/posts'
import Search from './page'

export default async function SearchPage() {
  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags()
  ])
  
  return <Search categories={categories} tags={tags} />
}
