'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'

import PaginationBar from '../../../components/pagination-bar'

interface PostsPaginationBarProps {
  totalPages: number
}

export default function PostsPaginationBar({ totalPages }: PostsPaginationBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')

  return (
    <PaginationBar
      totalPages={totalPages}
      currentPage={currentPage}
      onPageClick={(page) => router.push(`/?page=${page}`)}
    />
  )
}
