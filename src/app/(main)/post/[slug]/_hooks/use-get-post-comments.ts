import useSWR from 'swr'

import { getPostComments } from '@/services/client/post'
import { Comment } from '@/types/comment'
import { PaginatedData } from '@/types/shared/page-info'

export default function useGetPostComments(postId: number) {
  const { data, isLoading, error } = useSWR<PaginatedData<Comment>>(`/post/${postId}/comments`, () =>
    getPostComments(postId)
  )

  return { comments: data?.data, pageInfo: data?.pageInfo, isLoading, error }
}
