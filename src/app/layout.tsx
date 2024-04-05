import { AuthProvider } from './Providers'
import './globals.css'

import localFont from 'next/font/local'

const einaReg = localFont({
    src: '../../public/eina-03-regular.ttf',
    variable: '--font-eina-reg'
})
  
const einaSemi = localFont({
    src: '../../public/eina-03-semibold.ttf',
    variable: '--font-eina-semi'
})
  
const einaBold = localFont({
    src: '../../public/eina-03-bold.ttf',
    variable: '--font-eina-bold'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${einaReg.variable} ${einaSemi.variable} ${einaBold.variable} font-einaReg text-text-100 bg-bg-100 dark:text-dark-text-100 dark:bg-dark-bg-100 text-sm`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
