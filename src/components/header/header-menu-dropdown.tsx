import Link from 'next/link'
import { useState } from 'react'

import LogoutAlertDialog from '@/components/logout-alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user-avatar'
import useCurrentUser from '@/hooks/use-current-user'

export default function HeaderMenuDropdown() {
  const { user } = useCurrentUser()
  const [confirmLogout, setConfirmLogout] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <UserAvatar user={user} className='size-11' />
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
          <DropdownMenuItem onClick={() => setConfirmLogout(true)}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutAlertDialog open={confirmLogout} onOpenChange={setConfirmLogout} />
    </>
  )
}
