import { getSpecialPost } from '@/lib/posts'
import Link from 'next/link'
import styles from '../posts/[slug]/post.module.css'

interface PageParams {
  params: { slug: string }
}

export default async function SpecialPage({ params }: PageParams) {
  try {
    const post = await getSpecialPost(params.slug)

    return (
      <article className={styles.article}>
        <div className={styles.header}>
          <h1>{post.title}</h1>
          {post.published && (
            <div className={styles.metadata}>
              <time dateTime={post.published}>
                {new Date(post.published).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </time>
            </div>
          )}
        </div>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    )
  } catch (error) {
    console.error('Error loading special page:', error)
    return <div>页面加载失败</div>
  }
}
