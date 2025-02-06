import PostsPaginationBar from '@/app/(main)/_components/posts-pagination-bar'
import { getPosts } from '@/services/server/posts'

import PostCard from './_components/post-card'

interface HomePageProps {
  searchParams: Promise<{ page: string }>
}

export const revalidate = 0

export default async function HomePage({ searchParams }: HomePageProps) {
  const queryParams = await searchParams
  const { data: posts, pageInfo } = await getPosts(queryParams.page)

  return (
    <>
      {posts.length === 0 && <h2 className='text-center'>No posts found.</h2>}
      {posts.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      {pageInfo.totalPages > 1 && <PostsPaginationBar totalPages={pageInfo.totalPages} />}
    </>
  )
}
