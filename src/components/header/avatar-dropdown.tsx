import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useCurrentUser from '@/hooks/use-current-user'
import { logout } from '@/services/client/auth'

export default function AvatarDropdown() {
  const { user, mutate } = useCurrentUser()

  const onLogout = async () => {
    await logout()
    mutate(null)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='size-11'>
          <AvatarImage src={user?.avatarUrl || undefined} alt='avatar' />
          <AvatarFallback>{user?.displayName.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem asChild className='flex flex-col items-start cursor-pointer group'>
          <Link href={`/user/${user?.username}`}>
            <div>
              <p className='group-hover:underline'>{user?.displayName}</p>
              <p className='text-sm text-muted-foreground group-hover:underline'>@{user?.username}</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
