import Navbar from '../components/Navbar'
import './globals.css'
import 'highlight.js/styles/github-dark.css'  // 深色主题
import 'highlight.js/styles/github.css'       // 浅色主题

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
