"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Settings, LogOut, Shield, BellIcon, Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function ProfileModal() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@cartracking.com",
    phone: "(11) 99999-9999",
    role: "Administrador",
  })

  const handleSaveProfile = () => {
    alert("Perfil atualizado com sucesso!")
    setOpen(false)
  }

  const handleChangePassword = () => {
    alert("Funcionalidade de alteração de senha será implementada")
  }

  const handleLogout = () => {
    if (confirm("Deseja realmente sair do sistema?")) {
      alert("Logout realizado com sucesso!")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
          <User className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Perfil do Usuário</DialogTitle>
        </DialogHeader>

        <div className="flex gap-6">
          {/* Sidebar do Modal */}
          <div className="w-48 space-y-2">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "profile" ? "bg-green-600 text-white" : "text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "settings" ? "bg-green-600 text-white" : "text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant={activeTab === "security" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "security" ? "bg-green-600 text-white" : "text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setActiveTab("security")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </Button>
            <Separator className="bg-slate-700" />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:bg-red-500/20"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Conteúdo do Modal */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações do Perfil</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="bg-slate-900 border-slate-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="bg-slate-900 border-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="bg-slate-900 border-slate-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Cargo</Label>
                    <Input
                      id="role"
                      value={profileData.role}
                      disabled
                      className="bg-slate-900 border-slate-600 opacity-50"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveProfile} className="btn-primary">
                    Salvar Alterações
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Configurações</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      <div>
                        <p className="font-medium">Modo Escuro</p>
                        <p className="text-sm text-slate-400">Alternar entre tema claro e escuro</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BellIcon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Notificações Push</p>
                        <p className="text-sm text-slate-400">Receber notificações no navegador</p>
                      </div>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BellIcon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Notificações por E-mail</p>
                        <p className="text-sm text-slate-400">Receber notificações por e-mail</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Segurança</h3>

                <div className="space-y-4">
                  <div>
                    <Label>Senha Atual</Label>
                    <Input
                      type="password"
                      placeholder="Digite sua senha atual"
                      className="bg-slate-900 border-slate-600"
                    />
                  </div>

                  <div>
                    <Label>Nova Senha</Label>
                    <Input
                      type="password"
                      placeholder="Digite a nova senha"
                      className="bg-slate-900 border-slate-600"
                    />
                  </div>

                  <div>
                    <Label>Confirmar Nova Senha</Label>
                    <Input
                      type="password"
                      placeholder="Confirme a nova senha"
                      className="bg-slate-900 border-slate-600"
                    />
                  </div>

                  <Button onClick={handleChangePassword} className="btn-primary">
                    Alterar Senha
                  </Button>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <h4 className="font-medium mb-2">Sessões Ativas</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <p className="font-medium">Sessão Atual</p>
                      <p className="text-sm text-slate-400">Chrome - Windows • Agora</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
