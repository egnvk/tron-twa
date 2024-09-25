import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import AppProvider from './_/providers/app-provider'
import './_/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B1coin',
  description: 'When Lamba sir?'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
