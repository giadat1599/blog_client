import { cookies } from 'next/headers'
import { cache } from 'react'

import kyInstance from '@/lib/ky'
import { User } from '@/types/user'

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookie = await cookies()
  try {
    const user: User = await kyInstance.get('users/me', { headers: { Cookie: cookie.toString() } }).json()
    return user
  } catch {
    return null
  }
})
