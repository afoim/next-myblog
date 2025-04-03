import Navbar from '../components/Navbar'
import './globals.css'
import 'highlight.js/styles/github-dark.css'  // 深色主题
import 'highlight.js/styles/github.css'       // 浅色主题

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
