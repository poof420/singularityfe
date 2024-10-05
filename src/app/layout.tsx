import '@/app/globals.css'
import { Inter as FontSans } from "next/font/google"
import localFont from 'next/font/local'
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontAtkinson = localFont({
  src: [
    {
      path: '../../public/fonts/AtkinsonHyperlegible-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AtkinsonHyperlegible-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-atkinson',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontAtkinson.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}