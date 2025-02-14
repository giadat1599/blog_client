import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { useState } from 'react'

import UserAvatar from '@/components/user-avatar'
import useCurrentUser from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { Comment } from '@/types/comment'

dayjs.extend(relativeTime)

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { author, body, createdAt } = comment
  const [isReply, setIsReply] = useState(false)
  const { user } = useCurrentUser()
  return (
    <div className={cn(false && 'ml-10 mt-5')}>
      <div className='flex gap-x-2 mb-5'>
        <UserAvatar user={author} className='size-11' />
        <div className='flex flex-col gap-y-1 text-sm'>
          <div className='flex gap-x-1'>
            <Link href={`/user/${author.username}`} className='text-primary hover:underline'>
              {author.displayName}
            </Link>
            <span>{dayjs(createdAt).fromNow()}</span>
          </div>
          <p>{body}</p>
          {user && comment.id !== 0 && (
            <div className='space-x-3'>
              <button className='hover:underline'>Delete</button>
              <button className='hover:underline' onClick={() => setIsReply(!isReply)}>
                Reply
              </button>
            </div>
          )}
          {comment.id === 0 && <span className='text-muted-foreground'>Submitting...</span>}
        </div>
      </div>
      {/* {isReply && (
        <div className='ml-12'>
          <CommentInput placeholder='Reply to abc' onCancel={() => setIsReply(false)} />{' '}
        </div>
      )} */}
      {/* {false && <CommentItem isParent={false} />} */}
    </div>
  )
}
