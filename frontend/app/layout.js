import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Royalwbiq',
  description: 'A sign of impressions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
