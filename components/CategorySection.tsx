'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'react-feather'
import styles from '../app/categories/categories.module.css'
import { Post } from '@/types/post'

interface CategorySectionProps {
  category: string;
  posts: Post[];
}

export default function CategorySection({ category, posts }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayPosts = isExpanded ? posts : posts.slice(0, 5)

  return (
    <div className={styles.category}>
      <h2>
        {category}
        <span>({posts.length})</span>
      </h2>
      <div className={styles.posts}>
        {displayPosts.map(post => (
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
      {posts.length > 5 && (
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              <span>收起</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              <span>展开更多 ({posts.length - 5})</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
