import { getAllTags, getPostsByTag } from '@/lib/posts'
import Link from 'next/link'
import styles from './tags.module.css'

export default async function TagsPage() {
  const tags = await getAllTags()
  const tagCounts = await Promise.all(
    tags.map(async tag => ({
      tag,
      count: (await getPostsByTag(tag)).length
    }))
  )

  return (
    <div className={styles.container}>
      <h1>标签</h1>
      <div className={styles.tags}>
        {tagCounts.map(({ tag, count }) => (
          <Link 
            href={`/tags/${tag}`} 
            key={tag} 
            className={styles.tag}
          >
            {tag}
            <span className={styles.count}>({count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
