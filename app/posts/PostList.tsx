'use client'

import { useState } from 'react'
import Link from 'next/link'
import { List, Grid } from 'react-feather'
import { Post } from '@/types/post'
import TagLink from '@/components/TagLink'
import styles from './posts.module.css'

export default function PostList({ initialPosts }: { initialPosts: Post[] }) {
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid') // 修改默认值为 'grid'

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>博客文章</h1>
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.viewButton} ${viewType === 'list' ? styles.active : ''}`}
            onClick={() => setViewType('list')}
            aria-label="列表视图"
          >
            <List size={20} />
          </button>
          <button 
            className={`${styles.viewButton} ${viewType === 'grid' ? styles.active : ''}`}
            onClick={() => setViewType('grid')}
            aria-label="网格视图"
          >
            <Grid size={20} />
          </button>
        </div>
      </div>

      <div className={`${styles.posts} ${styles[viewType]}`}>
        {initialPosts?.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug} className={styles.post}>
            {viewType === 'grid' && post.cover?.image && (
              <div className={styles.coverImage}>
                <img 
                  src={post.cover.image} 
                  alt={post.title}
                  onError={(e) => {
                    e.currentTarget.classList.add(styles.imageError);
                  }}
                />
              </div>
            )}
            <div className={styles.postContent}>
              <h2>{post.title}</h2>
              <div className={styles.metadata}>
                <div className={styles.metaRow}>
                  <div className={styles.basicInfo}>
                    <time dateTime={post.published}>
                      {new Date(post.published).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </time>
                    {post.categories && (
                      <span className={styles.category}>
                        {post.categories}
                      </span>
                    )}
                  </div>
                </div>
                {post.tags && (
                  <div className={styles.tags}>
                    {post.tags.map(tag => (
                      <span
                        key={tag} 
                        className={styles.tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {post.summary && <p className={styles.summary}>{post.summary}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
