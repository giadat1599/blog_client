import { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {
  user: Pick<User, 'avatarUrl' | 'displayName'> | null | undefined
  className?: string
}

export default function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={user?.avatarUrl || undefined} alt='user-avatar' />
      <AvatarFallback>{user?.displayName.substring(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
