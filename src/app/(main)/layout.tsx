import { SWRConfig } from 'swr'

import Header from '@/components/header/header'
import { getCurrentUser } from '@/services/server/auth'

interface MainLayoutProps {
  children: React.ReactNode
}
export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getCurrentUser()

  return (
    <main className='min-h-screen'>
      <SWRConfig value={{ fallback: { ['/users/me']: user } }}>
        <Header />
        <div className='w-full lg:max-w-7xl mx-auto px-5 py-4'>{children}</div>
      </SWRConfig>
    </main>
  )
}
