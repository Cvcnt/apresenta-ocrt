"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NotificationsModal } from "@/components/modals/notifications-modal"
import { ProfileModal } from "@/components/modals/profile-modal"

export function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 px-6 flex items-center justify-between ml-16">
      <div className="flex items-center gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar..."
            className="pl-10 bg-slate-800 border-slate-600 text-slate-300 placeholder:text-slate-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                alert(`Buscando por: ${e.currentTarget.value}`)
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationsModal />
        <ProfileModal />
      </div>
    </header>
  )
}
