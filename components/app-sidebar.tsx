"use client"

import { BarChart3, Cpu, History, Home, Smartphone, Users, Zap, Palette, DollarSign } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Rastreadores", url: "/rastreadores", icon: Cpu },
  { title: "Técnicos", url: "/tecnicos", icon: Users },
  { title: "Chips", url: "/chips", icon: Smartphone },
  { title: "Custos", url: "/custos", icon: DollarSign },
  { title: "Atividades", url: "/atividades", icon: Zap },
  { title: "Histórico", url: "/historico", icon: History },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Design System", url: "/design", icon: Palette },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="group fixed left-0 top-0 h-screen z-50">
      {/* Sidebar colapsada - sempre visível */}
      <div className="w-16 bg-slate-900 border-r border-slate-700 h-full flex flex-col items-center py-6 transition-all duration-300 ease-in-out">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-8">
          <Cpu className="w-5 h-5 text-white" />
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`p-3 rounded-lg transition-colors ${
                pathname === item.url ? "bg-green-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title={item.title}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar expandida - aparece no hover */}
      <div className="absolute top-0 left-0 w-64 bg-slate-900 border-r border-slate-700 h-full opacity-0 pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CarTracking</span>
          </div>
        </div>

        <nav className="px-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                pathname === item.url ? "bg-green-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
