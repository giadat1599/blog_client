import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Markdown from '@/components/markdown'
import UserAvatar from '@/components/user-avatar'
import { createdOrUpdatedText } from '@/lib/utils'
import { getAllSlugs, getPostBySlug } from '@/services/server/posts'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      images: [{ url: post.featuredImageUrl }]
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  const { title, summary, author, createdAt, updatedAt, featuredImageUrl, body } = await getPostBySlug(slug)

  return (
    <article>
      <div className='flex flex-col items-center space-y-3'>
        <h1 className='text-center text-4xl font-bold'>{title}</h1>
        <p className='text-center text-lg'>{summary}</p>
        <span className='flex items-center gap-x-3 text-sm'>
          posted by <UserAvatar user={{ avatarUrl: author.avatarUrl, displayName: author.displayName }} />
          <Link href={`/user/${author.username}`} className='text-primary hover:underline'>
            {author.displayName}
          </Link>
        </span>
        <span className='text-muted-foreground text-sm'>{createdOrUpdatedText(createdAt, updatedAt)}</span>
        <div className='relative w-full max-w-[700px] mx-auto aspect-[70/45]'>
          <Image
            src={featuredImageUrl}
            fill
            sizes='(max-width: 768px) 100vw, 700px'
            alt='Post featured image'
            className='rounded '
          />
        </div>
      </div>
      <Markdown>{body}</Markdown>
    </article>
  )
}
