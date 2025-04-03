import Navbar from '../components/Navbar'
import './globals.css'
import 'highlight.js/styles/github-dark.css'  // 深色主题
import 'highlight.js/styles/github.css'       // 浅色主题
import Script from 'next/script'

export const metadata = {
  title: '二叉树树的博客',
  description: '使用 Next.js 构建的个人博客',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <Script
          src="https://analytics.umami.is/script.js"
          data-website-id="a66a5fd4-98b0-4108-8606-cb7094f380ac"    // 替换为你的网站 ID
          async
          defer
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
