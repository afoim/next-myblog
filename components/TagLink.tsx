'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface TagLinkProps {
  href: string
  className?: string
  children: ReactNode
}

export default function TagLink({ href, className, children }: TagLinkProps) {
  return (
    <Link 
      href={href} 
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Link>
  )
}
