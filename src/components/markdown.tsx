/* eslint-disable @next/next/no-img-element */
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

interface MarkdownProps {
  children: string
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className='markdown'
      remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 3, tight: true }]]}
      rehypePlugins={[rehypeSlug]}
      components={{
        img: (props) => (
          <span className='flex justify-center mx-auto my-8'>
            <a href={props.src} target='_blank' rel='noreferrer'>
              <img className='max-w-full cursor-zoom-in' {...props} alt={props.alt ?? ''} />
            </a>
          </span>
        )
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
