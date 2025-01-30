import { User } from './user'

export interface Post {
  id: number
  title: string
  slug: string
  summary: string
  body: string
  featuredImageUrl: string
  authorId: number
  author: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>
  createdAt: Date
  updatedAt: Date
}
