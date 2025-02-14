import { useSWRConfig } from 'swr'

import useCurrentUser from '@/hooks/use-current-user'
import { useToast } from '@/hooks/use-toast'
import { createPostComment } from '@/services/client/post'
import { Comment } from '@/types/comment'

import useGetPostComments from './use-get-post-comments'

export default function useCreatePostComment(postId: number) {
  const { toast } = useToast()
  const { comments, pageInfo } = useGetPostComments(postId)
  const { mutate } = useSWRConfig()
  const { user } = useCurrentUser()

  const createComment = (body: string) => {
    const newComment: Comment = {
      id: 0,
      author: {
        id: user!.id,
        username: user!.username,
        avatarUrl: user!.avatarUrl,
        displayName: user!.displayName
      },
      body,
      authorId: user!.id,
      postId,
      parentCommentId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const updatedComments = [...(comments || []), newComment]

    mutate(
      `/post/${postId}/comments`,
      async () => {
        const comment = await createPostComment(postId, body)
        updatedComments.pop()
        return {
          data: [...updatedComments, { ...newComment, id: comment.id }],
          pageInfo: {
            ...pageInfo,
            count: (pageInfo?.count || 0) + 1
          }
        }
      },
      {
        optimisticData: {
          data: updatedComments,
          pageInfo: {
            ...pageInfo,
            count: (pageInfo?.count || 0) + 1
          }
        },
        rollbackOnError: () => {
          toast({
            variant: 'destructive',
            description: 'Failed to submit the comment. Please try again.'
          })
          return true
        },
        revalidate: false
      }
    )
  }

  return { createComment }
}
