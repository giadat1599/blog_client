import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/services/server/auth'

import SignUpForm from '../_components/sign-up-form/signup-form'

export default async function SignUpPage() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  return (
    <div>
      <SignUpForm />
      <hr className='h-[1px] my-10 bg-primary' />
      <p className='text-center text-sm'>
        Already have an account?{' '}
        <Link href='/login' className='text-primary hover:underline'>
          Login
        </Link>
      </p>
    </div>
  )
}
