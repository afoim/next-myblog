import { getPostBySlug } from '@/lib/posts'
import Link from 'next/link'
import styles from './post.module.css'

interface PageParams {
  params: Promise<{ slug: string }>
}

export default async function Post({ params }: PageParams) {
  try {
    const resolvedParams = await params
    const post = await getPostBySlug(resolvedParams.slug)

    return (
      <article className={styles.article}>
        <div className={styles.header}>
          <h1>{post.title}</h1>
          <div className={styles.metadata}>
            <div className={styles.basicInfo}>
              <time dateTime={post.published}>
                {new Date(post.published).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </time>
              {post.categories && (
                <Link href={`/categories/${post.categories}`} className={styles.category}>
                  {post.categories}
                </Link>
              )}
            </div>
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
        </div>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        <div className={styles.comments}>
          <h1>老子不想做评论</h1>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error loading post:', error)
    return <div>文章加载失败</div>
  }
}
