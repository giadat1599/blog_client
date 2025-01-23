import Header from '@/components/header/header'

interface MainLayoutProps {
  children: React.ReactNode
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='w-full lg:max-w-7xl mx-auto px-5 py-3'>{children}</div>
    </main>
  )
}
