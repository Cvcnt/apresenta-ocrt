"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Toast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => removeToast(id), 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg border max-w-sm ${
              toast.type === "success"
                ? "bg-green-900 border-green-700 text-green-100"
                : toast.type === "error"
                  ? "bg-red-900 border-red-700 text-red-100"
                  : "bg-blue-900 border-blue-700 text-blue-100"
            }`}
          >
            <h4 className="font-medium">{toast.title}</h4>
            {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
