export interface User {
  id: number
  username: string
  email: string
  displayName: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}
