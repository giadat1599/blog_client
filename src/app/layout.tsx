import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import AppProgressBar from '@/components/app-progress-bar'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'NEXT Blog',
  description: 'Share thoughts, tips or anything to the community'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <AppProgressBar />
      </body>
    </html>
  )
}
