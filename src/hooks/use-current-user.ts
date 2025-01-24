import useSWR from 'swr'

import { CURRENT_USER } from '@/swr/keys'
import { User } from '@/types/user'

export default function useCurrentUser() {
  const { data, mutate } = useSWR<User>(CURRENT_USER)

  return {
    user: data,
    mutate
  }
}
