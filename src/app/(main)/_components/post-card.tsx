import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import UserAvatar from '@/components/user-avatar'
import { Post } from '@/types/post'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { featuredImageUrl, id, author, summary, title, createdAt } = post
  return (
    <Card className='hover:border-primary border-2 hover:shadow-primary/20 hover:shadow-md overflow-hidden transition shadow-none'>
      <Link href={`/post/${id}`}>
        <CardHeader className='p-0'>
          <Image
            src={featuredImageUrl}
            alt='Post featured image'
            height={250}
            width={550}
            className='object-cover h-[250px] w-[550px]'
          />
        </CardHeader>
        <CardContent className='pt-3 space-y-1'>
          <CardTitle className='text-primary'>{title}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardContent>
        <CardFooter className='font-normal text-sm flex flex-col items-start space-y-1'>
          <div className='flex items-center gap-x-1'>
            <UserAvatar user={{ avatarUrl: author.avatarUrl, displayName: author.displayName }} className='size-7' />{' '}
            <span className='text-primary'>{author.displayName}</span>
          </div>
          <div className='flex items-center gap-x-1 text-sm text-muted-foreground'>
            on {dayjs(createdAt).format('MMM D, YYYY')}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
