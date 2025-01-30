'use client'

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationPreviousButton,
  PaginationNextButton
} from '@/components/ui/pagination'

interface PaginationBarProps {
  totalPages: number
  currentPage: number
  onPageClick: (page: number) => void
}

export default function PaginationBar({ totalPages, onPageClick, currentPage = 1 }: PaginationBarProps) {
  const getPageNumbers = () => {
    const pages = new Set<number>()
    pages.add(1) // always show the first page
    pages.add(totalPages) // always show the last page
    pages.add(currentPage)

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      // add window pages from the previous 2 pages of the currentPage to next 2 pages of the currentPage
      if (i >= 1 && i <= totalPages) {
        pages.add(i)
      }
    }

    const sorted = Array.from(pages).sort((a, b) => a - b)
    const result = []
    let prev
    for (const page of sorted) {
      if (prev !== undefined && page - prev > 1) {
        // if page and prev are not consecutive, add ellipsis
        result.push('...')
      }
      result.push(page)
      prev = page
    }
    return result
  }

  return (
    <Pagination className='mt-5'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousButton disabled={currentPage - 1 < 1} onClick={() => onPageClick(currentPage - 1)} />
        </PaginationItem>
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <PaginationItem key={index}>
              <PaginationButton size='icon' isActive={currentPage === page} onClick={() => onPageClick(page)}>
                {page}
              </PaginationButton>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNextButton disabled={currentPage + 1 >= totalPages} onClick={() => onPageClick(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
