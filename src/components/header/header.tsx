'use client'

import Link from 'next/link'

import NextTextLogo from '@/components/next-text-logo'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/use-current-user'

import HeaderMenuDropdown from './header-menu-dropdown'
import MobileSheet from './mobile-sheet'

export default function Header() {
  const { user } = useCurrentUser()

  return (
    <header className='sticky top-0 shadow bg-card z-50'>
      <div className='w-full flex items-center justify-between lg:max-w-7xl mx-auto px-5 py-3 h-16'>
        <div className='flex items-center gap-x-3'>
          <MobileSheet />
          <Link href='/'>
            <NextTextLogo />
          </Link>
        </div>
        {!user && (
          <div className='flex items-center gap-x-3'>
            <Button variant='ghost' asChild>
              <Link href='/login' className='hover:underline'>
                Log in
              </Link>
            </Button>
            <Button variant='outline' className='hidden sm:flex' asChild>
              <Link href='/signup' className='hover:underline'>
                Create an account
              </Link>
            </Button>
          </div>
        )}
        {user && <HeaderMenuDropdown />}
      </div>
    </header>
  )
}
