"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell, Check, X, AlertTriangle, Info, CheckCircle } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Rastreador TR002 com problema",
    message: "Sinal GPS perdido há 2 horas",
    time: "5 min atrás",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Instalação concluída",
    message: "TR015 instalado com sucesso por João Silva",
    time: "1 hora atrás",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Novo técnico cadastrado",
    message: "Pedro Oliveira foi adicionado à equipe",
    time: "2 horas atrás",
    read: true,
  },
  {
    id: 4,
    type: "warning",
    title: "Chip com baixo sinal",
    message: "Chip 11987654322 com sinal fraco",
    time: "3 horas atrás",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-orange-400" />
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-400" />
    case "info":
      return <Info className="w-5 h-5 text-blue-400" />
    default:
      return <Bell className="w-5 h-5 text-slate-400" />
  }
}

export function NotificationsModal() {
  const [open, setOpen] = useState(false)
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notificações</DialogTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-slate-400 hover:text-white">
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notificationList.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read ? "bg-slate-900 border-slate-700" : "bg-slate-700 border-slate-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-400 hover:text-green-400"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-400"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mt-1">{notification.message}</p>
                    <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
