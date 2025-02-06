import { unstable_cache } from 'next/cache'

import kyInstance from '@/lib/ky'
import { Post } from '@/types/post'
import { PaginatedData } from '@/types/shared/page-info'

export const getPosts = async (page: string = '1'): Promise<PaginatedData<Post>> => {
  const posts: PaginatedData<Post> = await kyInstance.get('posts', { searchParams: { page } }).json()
  return posts
}

export const getPostBySlug = (slug: string): Promise<Post> => {
  return unstable_cache(
    async (slug: string) => {
      const post: Post = await await kyInstance.get(`posts/${slug}`).json()
      return post
    },
    [slug],
    { tags: [slug] }
  )(slug)
}

export const getAllSlugs = async (): Promise<{ slug: string }[]> => {
  const slugs: { slug: string }[] = await kyInstance.get('posts/slugs').json()
  return slugs
}
