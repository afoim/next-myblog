"use client"
import Link from 'next/link'
import { Home } from 'react-feather'
import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" aria-label="首页">
          <Home size={24} />
        </Link>
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>二叉树树的博客</h1>
      </div>
      <div className={styles.links}>
        <Link href="/search">搜索</Link>
        <a href="https://link.me/acofork" target="_blank" rel="noopener noreferrer">关于</a>
      </div>
    </nav>
  )
}
