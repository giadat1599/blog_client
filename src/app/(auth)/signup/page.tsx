import Link from 'next/link'

import SignUpForm from '../_components/sign-up-form/signup-form'

export default function SignUpPage() {
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
