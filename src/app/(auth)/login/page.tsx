import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/services/server/auth'

import LoginForm from '../_components/login-form'

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  return (
    <div>
      <LoginForm />
      <hr className='h-[1px] my-10 bg-primary' />
      <p className='text-center text-sm'>
        New to Next Blog Community?{' '}
        <Link href='/signup' className='text-primary hover:underline'>
          Create an account
        </Link>
      </p>
    </div>
  )
}
