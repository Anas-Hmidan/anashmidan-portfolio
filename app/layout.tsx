import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "Anas Hmidan - IT Student",
  description: "Portfolio website of Anas Hmidan, IT Student specializing in Information Systems Development",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg" }],
    other: [
      {
        rel: "icon",
        url: "/favicon.svg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} style={{ fontSize: "14px" }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <style>{`
          html {
            font-size: 14px !important;
          }
          body {
            font-size: 0.95rem !important;
          }
          .container {
            max-width: 100% !important;
          }
          @media (min-width: 640px) {
            .container {
              max-width: 540px !important;
            }
          }
          @media (min-width: 768px) {
            .container {
              max-width: 650px !important;
            }
          }
          @media (min-width: 1024px) {
            .container {
              max-width: 870px !important;
            }
          }
          @media (min-width: 1280px) {
            .container {
              max-width: 1090px !important;
            }
          }
          @media (min-width: 1536px) {
            .container {
              max-width: 1300px !important;
            }
          }
        `}</style>
      </head>
      <body className={`${inter.className} bg-black text-[0.95rem]`} style={{ fontSize: "0.95rem" }}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

