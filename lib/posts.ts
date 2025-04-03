import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'  // 添加 GFM 支持
import remarkBreaks from 'remark-breaks'  // 添加换行支持
import remarkHeadings from 'remark-heading-id'  // 添加标题 ID 支持
import hljs from 'highlight.js'
import { Post } from '@/types/post'

const postsDirectory = path.join(process.cwd(), '_posts')
const specialDirectory = path.join(process.cwd(), '_special')  // 添加特殊页面目录

export async function getPostBySlug(slug: string, isSpecial: boolean = false): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, '')
  const directory = isSpecial ? specialDirectory : postsDirectory
  const fullPath = path.join(directory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(remarkGfm)  // 支持表格、任务列表、删除线等
    .use(remarkBreaks)  // 支持软换行
    .use(remarkHeadings)  // 为标题添加 ID
    .use(() => (tree) => {
      // 遍历语法树，处理代码块和列表
      const visit = (node) => {
        // 处理标题，添加锚点
        if (node.type === 'heading') {
          const text = node.children
            .filter(child => child.type === 'text')
            .map(child => child.value)
            .join('')
          
          // 使用 encodeURIComponent 处理标题文本
          const id = encodeURIComponent(text.trim())

          node.data = {
            hProperties: {
              id: id,
              className: 'heading-anchor'
            }
          }

          const link = {
            type: 'link',
            url: `#${id}`,
            data: {
              hProperties: {
                className: 'anchor-link'
              }
            },
            children: node.children
          }

          node.children = [link]
        }

        // 处理列表
        if (node.type === 'list') {
          node.spread = true  // 确保列表项之间有间距
          if (node.ordered) {
            node.start = node.start || 1  // 确保有序列表从正确的数字开始
          }
        }

        // 处理代码块
        if (node.type === 'code') {
          const value = node.value || ''
          const lang = (node.lang || 'plaintext').toLowerCase()
          const highlighted = lang && hljs.getLanguage(lang)
            ? hljs.highlight(value, { language: lang }).value
            : hljs.highlightAuto(value).value

          // 转义代码内容中的特殊字符
          const escapedValue = value
            .replace(/`/g, '\\`')  // 转义反引号
            .replace(/\$/g, '\\$') // 转义美元符号
            .replace(/</g, '&lt;') // 转义小于号
            .replace(/>/g, '&gt;') // 转义大于号

          const lines = value.split('\n')
          const shouldCollapse = lines.length > 10

          node.type = 'html'
          node.value = `
            <div class="codeblock-wrapper">
              <div class="codeblock-header">
                <span class="language">${lang}</span>
                <button class="copy-button" onclick="navigator.clipboard.writeText(\`${escapedValue}\`)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1-2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </button>
              </div>
              <pre class="${shouldCollapse ? 'collapsed' : ''}"><code class="hljs language-${lang}">${highlighted}</code></pre>
              ${shouldCollapse ? `
                <button class="toggle-button" onclick="this.previousElementSibling.classList.toggle('collapsed');this.classList.toggle('expanded')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  <span class="toggle-text" data-text-expanded="收起" data-text-collapsed="显示全部 (${lines.length} 行)">
                    显示全部 (${lines.length} 行)
                  </span>
                </button>
                <script>
                  document.querySelectorAll('.toggle-button').forEach(btn => {
                    btn.addEventListener('click', () => {
                      const span = btn.querySelector('.toggle-text');
                      const isExpanded = btn.classList.contains('expanded');
                      span.textContent = span.dataset[isExpanded ? 'textExpanded' : 'textCollapsed'];
                    });
                  });
                </script>
              ` : ''}
            </div>
          `
        }
        
        if (node.children) {
          node.children.forEach(visit)
        }
      }
      
      visit(tree)
    })
    .use(remarkHtml, {
      sanitize: false,  // 允许 HTML 标签
      allowDangerousHtml: true  // 允许危险的 HTML
    })
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug: realSlug,
    title: data.title,
    published: data.published,
    summary: data.summary,
    cover: data.cover,
    tags: data.tags,
    categories: data.categories,
    draft: data.draft || false,
    lang: data.lang || 'zh',
    content: contentHtml,
  }
}

export async function getSpecialPost(slug: string): Promise<Post> {
  return getPostBySlug(slug, true)
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = fs.readdirSync(postsDirectory)
  const allPosts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  )
  
  // 过滤掉草稿文章并按日期排序
  const posts = allPosts.filter(post => !post.draft)
  return posts.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.categories === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags?.includes(tag))
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(post => post.categories).filter(Boolean))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap(post => post.tags || []))
  return Array.from(tags)
}

export async function getPostsByYear(year: number): Promise<{[key: string]: Post[]}> {
  const posts = await getAllPosts()
  const postsByYear = posts.reduce((acc, post) => {
    const postDate = new Date(post.published)
    const postYear = postDate.getFullYear()
    if (postYear === year) {
      const month = postDate.toLocaleString('default', { month: 'long' })
      if (!acc[month]) acc[month] = []
      acc[month].push(post)
    }
    return acc
  }, {} as {[key: string]: Post[]})
  return postsByYear
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts()
  const searchQuery = query.toLowerCase()
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery) ||
    post.content.toLowerCase().includes(searchQuery) ||
    post.summary?.toLowerCase().includes(searchQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
  )
}

interface SearchResult {
  post: Post;
  matches: {
    title: number;
    content: string[];
    summary?: number;
  };
}

function highlightText(text: string, query: string): string {
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export async function searchPostsWithDetails(query: string): Promise<SearchResult[]> {
  const posts = await getAllPosts()
  const searchQuery = query.toLowerCase()
  
  return posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery)
    const contentMatches = post.content.toLowerCase()
      .split(/[.!?。！？]/)
      .filter(sentence => sentence.includes(searchQuery))
    const summaryMatch = post.summary?.toLowerCase().includes(searchQuery)
    
    return titleMatch || contentMatches.length > 0 || summaryMatch
  }).map(post => {
    const titleHighlighted = highlightText(post.title, query)
    const contentMatches = post.content.toLowerCase()
      .split(/[.!?。！？]/)
      .filter(sentence => sentence.includes(searchQuery))
      .map(sentence => highlightText(sentence.trim(), query))
    const summaryHighlighted = post.summary ? highlightText(post.summary, query) : null

    return {
      post: {
        ...post,
        title: titleHighlighted,
        summary: summaryHighlighted || post.summary
      },
      matches: {
        title: (post.title.toLowerCase().match(new RegExp(searchQuery, 'g')) || []).length,
        content: contentMatches,
        summary: post.summary ? 
          (post.summary.toLowerCase().match(new RegExp(searchQuery, 'g')) || []).length : 0
      }
    }
  })
}
