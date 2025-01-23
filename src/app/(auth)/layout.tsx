import NextTextLogo from '@/components/next-text-logo'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className='min-h-screen'>
      <div className='w-full md:max-w-2xl mx-auto px-5 py-10'>
        <p className='text-center text-3xl font-bold tracking-wide'>
          Join the <NextTextLogo className='text-3xl' /> Blog Community
        </p>
        {children}
      </div>
    </main>
  )
}
