import { getPostsByTag } from '@/lib/posts'
import Link from 'next/link'
import styles from './tag.module.css'

interface PageParams {
  params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: PageParams) {
  try {
    const resolvedParams = await params
    const encodedTag = encodeURIComponent(resolvedParams.tag)
    const posts = await getPostsByTag(encodedTag)

    return (
      <div className={styles.container}>
        <h1>标签: {decodeURIComponent(encodedTag)}</h1>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug} className={styles.post}>
              <div className={styles.postContent}>
                <h2>{post.title}</h2>
                <time dateTime={post.published}>
                  {new Date(post.published).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>
              </div>
              {post.categories && (
                <Link href={`/categories/${post.categories}`} className={styles.category}>
                  {post.categories}
                </Link>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading tag page:', error)
    return <div>加载失败</div>
  }
}
