import { ArrowRight } from 'react-feather'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>二叉树树的个人博客</h1>
        <div className={styles.slogan}>
          <p>
            欢迎！本博客使用
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
            构建，大部分功能使用
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
            实现，由
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude 3.5 Sonnet</a>
            进行全自动开发，部署在
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel CDN</a>
            上，开源于
            <a href="https://github.com/afoim/next-myblog" target="_blank" rel="noopener noreferrer">Github</a>
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <a href="/posts" className={styles.card}>
          <h2>博客文章 <ArrowRight size={20} className={styles.arrow} /></h2>
          <p>浏览我的所有博客文章</p>
        </a>

        <a href="https://link.me/acofork" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2>关于我 <ArrowRight size={20} className={styles.arrow} /></h2>
          <p>了解更多关于我的信息</p>
        </a>

        <a href="https://github.com/afoim" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2>GitHub <ArrowRight size={20} className={styles.arrow} /></h2>
          <p>访问我的GitHub主页</p>
        </a>
      </div>
    </main>
  )
}
