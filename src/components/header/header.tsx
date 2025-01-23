import Link from 'next/link'

import { Button } from '@/components/ui/button'

import NextTextLogo from '../next-text-logo'
import MobileSheet from './mobile-sheet/mobile-sheet'

export default function Header() {
  return (
    <header className='sticky top-0 shadow bg-card'>
      <div className='w-full flex items-center justify-between lg:max-w-7xl mx-auto px-5 py-3'>
        <div className='flex items-center gap-x-3'>
          <MobileSheet />
          <Link href='/'>
            <NextTextLogo />
          </Link>
        </div>
        <div className='flex items-center gap-x-3'>
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
      </div>
    </header>
  )
}
