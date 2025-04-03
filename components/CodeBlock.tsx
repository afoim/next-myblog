'use client'

import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp } from 'react-feather'
import styles from './codeblock.module.css'

interface CodeBlockProps {
  code: string
  language: string
  collapsed?: boolean // 默认是否折叠
  maxVisibleLines?: number // 折叠时显示的最大行数
}

export default function CodeBlock({ code, language, collapsed = true, maxVisibleLines = 10 }: CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const [isCopied, setIsCopied] = useState(false)
  const lines = code.split('\n')
  const shouldCollapse = lines.length > maxVisibleLines

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const displayedLines = isCollapsed ? lines.slice(0, maxVisibleLines) : lines

  return (
    <div className={styles.codeBlockWrapper}>
      <div className={styles.codeHeader}>
        <span className={styles.language}>{language}</span>
        <button className={styles.copyButton} onClick={handleCopy}>
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className={`${styles.pre} ${isCollapsed ? styles.collapsed : ''}`}>
        <code className={`hljs language-${language}`}>
          {displayedLines.join('\n')}
        </code>
      </pre>
      {shouldCollapse && (
        <button 
          className={styles.toggleButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <>
              <ChevronDown size={16} />
              <span>显示全部 ({lines.length} 行)</span>
            </>
          ) : (
            <>
              <ChevronUp size={16} />
              <span>收起</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
