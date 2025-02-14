'use client'

import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'

import useGetPostComments from '@/app/(main)/post/[slug]/_hooks/use-get-post-comments'
import useCurrentUser from '@/hooks/use-current-user'

import CommentInput from './comment-input'
import CommentItem from './comment-item'

interface CommentSectionProps {
  postId: number
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useCurrentUser()
  const { comments, pageInfo, isLoading, error } = useGetPostComments(postId)
  const totalComments = pageInfo?.count || 0

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader2Icon className='animate-spin size-10 text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center gap-x-2 text-destructive'>
        <AlertTriangleIcon />
        <p>Something went wrong</p>
      </div>
    )
  }

  return (
    <>
      <p className='mb-5'>
        {totalComments} {totalComments > 1 ? 'Comments' : 'Comment'}
      </p>
      {user && (
        <>
          <CommentInput postId={postId} />
          <hr className='my-10' />
        </>
      )}

      <div className='space-y-7'>{comments?.map((comment) => <CommentItem key={comment.id} comment={comment} />)}</div>
    </>
  )
}
