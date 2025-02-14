import useSWR from 'swr'

import { User } from '@/types/user'

export default function useCurrentUser() {
  const { data, mutate } = useSWR<User | null>('/users/me')

  return {
    user: data,
    mutate
  }
}
