import { cache } from 'react'

import kyInstance from '@/lib/ky'
import { Post } from '@/types/post'
import { PaginatedData } from '@/types/shared/page-info'

export const getPosts = cache(async (page: string = '1'): Promise<PaginatedData<Post>> => {
  const posts: PaginatedData<Post> = await kyInstance.get('posts', { searchParams: { page } }).json()
  return posts
})
