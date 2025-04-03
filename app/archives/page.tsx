import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import styles from './archives.module.css'

export default async function Archives() {
  const posts = await getAllPosts()
  const years = [...new Set(posts.map(post => 
    new Date(post.published).getFullYear()
  ))].sort((a, b) => b - a)

  const postsByYear = years.reduce((acc, year) => {
    acc[year] = posts.filter(post => 
      new Date(post.published).getFullYear() === year
    )
    return acc
  }, {} as { [key: number]: typeof posts })

  return (
    <div className={styles.container}>
      <h1>文章归档</h1>
      <div className={styles.timeline}>
        {years.map(year => (
          <div key={year} className={styles.year}>
            <h2>{year}</h2>
            <div className={styles.posts}>
              {postsByYear[year].map(post => (
                <Link href={`/posts/${post.slug}`} key={post.slug} className={styles.post}>
                  <time dateTime={post.published}>
                    {new Date(post.published).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </time>
                  <h3>{post.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
