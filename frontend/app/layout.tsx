import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import FloatingAIChat from '@/components/FloatingAIChat'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Tourist Safety System',
  description: 'AI-powered tourist safety monitoring and incident response system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
                <Navbar />
                <main className="flex-1 pt-20 pb-8 px-4">
                  {children}
                </main>
                <Footer />
                <FloatingAIChat />
              </div>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}