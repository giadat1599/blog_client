import Link from 'next/link'

import LoginForm from '../_components/login-form'

export default function LoginPage() {
  // TODO: check if user is authenticated, redirect user to home page
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
