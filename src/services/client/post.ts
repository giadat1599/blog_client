import kyInstance from '@/lib/ky'
import { Comment } from '@/types/comment'
import { PaginatedData } from '@/types/shared/page-info'

export const getPostComments = async (postId: number) => {
  const comments: PaginatedData<Comment> = await kyInstance.get(`posts/${postId}/comments`).json()
  return comments
}

export const createPostComment = async (postId: number, body: string) => {
  const [comment]: Comment[] = await kyInstance.post(`posts/${postId}/comments`, { json: { body } }).json()
  return comment
}
