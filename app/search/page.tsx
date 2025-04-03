'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './search.module.css'

export default function Search() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className={styles.container}>
      <h1>站内搜索</h1>
      
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="输入关键词搜索..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          搜索
        </button>
      </form>

      <div className={styles.quickLinks}>
        <Link href="/categories" className={styles.quickLink}>
          分类浏览
        </Link>
        <Link href="/tags" className={styles.quickLink}>
          标签浏览
        </Link>
      </div>
    </div>
  )
}
