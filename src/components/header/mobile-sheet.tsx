import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

import NextTextLogo from '@/components/next-text-logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useCurrentUser from '@/hooks/use-current-user'

export default function MobileSheet() {
  const { user } = useCurrentUser()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden flex'>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle hidden>
            {user ? 'Mobile Navigation Drawer' : 'Log in to your account or create a new one'}
          </SheetTitle>
          <NextTextLogo />
        </SheetHeader>
        <div className='space-y-3 mt-3'>
          {!user && (
            <div className='flex flex-col gap-y-3'>
              <Button variant='ghost' asChild>
                <Link href='/login' className='hover:underline'>
                  Log in
                </Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/signup' className='hover:underline'>
                  Create an account
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
