import { User } from './user'

export interface Comment {
  id: number
  author: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>
  body: string
  authorId: number
  postId: number
  parentCommentId: number | null
  createdAt: Date
  updatedAt: Date
}
