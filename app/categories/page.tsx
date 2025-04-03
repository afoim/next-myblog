import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import CategorySection from '@/components/CategorySection'
import styles from './categories.module.css'

export default async function Categories() {
  const categories = await getAllCategories()
  const categorizedPosts = await Promise.all(
    categories.map(async category => ({
      category,
      posts: await getPostsByCategory(category)
    }))
  )

  return (
    <div className={styles.container}>
      <h1>文章分类</h1>
      <div className={styles.categories}>
        {categorizedPosts.map(({ category, posts }) => (
          <CategorySection 
            key={category} 
            category={category} 
            posts={posts}
          />
        ))}
      </div>
    </div>
  )
}
