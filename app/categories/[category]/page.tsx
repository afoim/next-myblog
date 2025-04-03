import { getPostsByCategory } from '@/lib/posts'
import Link from 'next/link'
import styles from './category.module.css'

interface PageParams {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageParams) {
  try {
    const resolvedParams = await params
    const encodedCategory = encodeURIComponent(resolvedParams.category)
    const posts = await getPostsByCategory(encodedCategory)

    return (
      <div className={styles.container}>
        <h1>分类: {decodeURIComponent(encodedCategory)}</h1>
        <div className={styles.posts}>
          {posts.map(post => (
            <div key={post.slug} className={styles.post}>
              <Link href={`/posts/${post.slug}`} className={styles.postContent}>
                <h2>{post.title}</h2>
                <time dateTime={post.published}>
                  {new Date(post.published).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>
              </Link>
              {post.tags && (
                <div className={styles.tags}>
                  {post.tags.map(tag => (
                    <Link 
                      href={`/tags/${tag}`}
                      key={tag} 
                      className={styles.tag}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading category page:', error)
    return <div>加载失败</div>
  }
}
