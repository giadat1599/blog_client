export interface PageInfo {
  page: number
  count: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedData<T> {
  data: T[]
  pageInfo: PageInfo
}
