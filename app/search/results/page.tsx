import { searchPostsWithDetails } from '@/lib/posts'
import Link from 'next/link'
import styles from './results.module.css'
import { useState } from 'react'

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const results = await searchPostsWithDetails(query)

  return (
    <div className={styles.container}>
      <h1>搜索结果: {query}</h1>
      <p className={styles.summary}>找到 {results.length} 篇相关文章</p>

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map(({ post, matches }) => (
            <div key={post.slug} className={styles.result}>
              <Link href={`/posts/${post.slug}`} className={styles.resultTitle}>
                <div className={styles.highlightWrapper}>
                  <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
                  {post.summary && (
                    <p 
                      className={styles.excerpt} 
                      dangerouslySetInnerHTML={{ __html: post.summary }}
                    />
                  )}
                </div>
                <div className={styles.meta}>
                  <time dateTime={post.published}>
                    {new Date(post.published).toLocaleDateString('zh-CN')}
                  </time>
                  {post.categories && (
                    <Link href={`/categories/${post.categories}`} className={styles.category}>
                      {post.categories}
                    </Link>
                  )}
                </div>
              </Link>
              
              <details className={styles.matches}>
                <summary>查看匹配详情</summary>
                <div className={styles.matchDetails}>
                  {matches.title > 0 && (
                    <p>在标题中找到 {matches.title} 处匹配</p>
                  )}
                  {matches.summary > 0 && (
                    <p>在摘要中找到 {matches.summary} 处匹配</p>
                  )}
                  {matches.content.length > 0 && (
                    <>
                      <p>在正文中找到 {matches.content.length} 处匹配：</p>
                      <ul>
                        {matches.content.map((sentence, index) => (
                          <li 
                            key={index}
                            dangerouslySetInnerHTML={{ __html: `...${sentence}...` }}
                          />
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </details>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <p>未找到相关文章</p>
            <Link href="/search" className={styles.backButton}>
              返回搜索
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
