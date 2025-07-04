import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CarTracking - Sistema de Gestão de Rastreadores",
  description: "Sistema integrado para gestão de rastreadores, chips, técnicos e atividades",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-950 text-white">{children}</div>
      </body>
    </html>
  )
}
