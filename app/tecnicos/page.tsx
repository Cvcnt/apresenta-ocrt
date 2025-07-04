"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Users, TrendingUp, Target, Award } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewTechnicianModal } from "@/components/modals/new-technician-modal"
import { TechnicianGoalsModal } from "@/components/modals/technician-goals-modal"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const techniciansData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 99999-1111",
    specialty: "Instalação",
    status: "Ativo",
    location: "São Paulo - SP",
    experience: "3 anos",
    completedJobs: 145,
    efficiency: 94,
    rating: 4.8,
    currentGoal: 20,
    goalProgress: 85,
    assignedTrackers: ["TR001", "TR015", "TR032"],
    receivedTrackers: [
      { tracker: "TR001", date: "2024-01-15", from: "Estoque" },
      { tracker: "TR015", date: "2024-01-14", from: "Maria Santos" },
    ],
    returnedTrackers: [{ tracker: "TR008", date: "2024-01-13", to: "Completo", reason: "Instalação finalizada" }],
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    phone: "(11) 99999-2222",
    specialty: "Reparo",
    status: "Ativo",
    location: "Rio de Janeiro - RJ",
    experience: "5 anos",
    completedJobs: 203,
    efficiency: 91,
    rating: 4.6,
    currentGoal: 15,
    goalProgress: 120,
    assignedTrackers: ["TR002", "TR025"],
    receivedTrackers: [
      { tracker: "TR002", date: "2024-01-14", from: "Estoque" },
      { tracker: "TR025", date: "2024-01-13", from: "Carlos Lima" },
    ],
    returnedTrackers: [
      { tracker: "TR015", date: "2024-01-14", to: "João Silva", reason: "Transferência para instalação" },
      { tracker: "TR019", date: "2024-01-12", to: "Completo", reason: "Reparo finalizado" },
    ],
  },
  {
    id: 3,
    name: "Carlos Lima",
    email: "carlos.lima@empresa.com",
    phone: "(11) 99999-3333",
    specialty: "Manutenção",
    status: "Ativo",
    location: "Belo Horizonte - MG",
    experience: "2 anos",
    completedJobs: 87,
    efficiency: 88,
    rating: 4.4,
    currentGoal: 12,
    goalProgress: 75,
    assignedTrackers: ["TR003", "TR018"],
    receivedTrackers: [{ tracker: "TR003", date: "2024-01-13", from: "Estoque" }],
    returnedTrackers: [
      { tracker: "TR025", date: "2024-01-13", to: "Maria Santos", reason: "Necessita reparo especializado" },
    ],
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    phone: "(11) 99999-4444",
    specialty: "Instalação",
    status: "Ativo",
    location: "Salvador - BA",
    experience: "4 anos",
    completedJobs: 156,
    efficiency: 96,
    rating: 4.9,
    currentGoal: 18,
    goalProgress: 110,
    assignedTrackers: ["TR004", "TR021", "TR029"],
    receivedTrackers: [
      { tracker: "TR004", date: "2024-01-12", from: "Estoque" },
      { tracker: "TR021", date: "2024-01-11", from: "Estoque" },
    ],
    returnedTrackers: [{ tracker: "TR012", date: "2024-01-10", to: "Completo", reason: "Instalação finalizada" }],
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ativo":
      return "status-active"
    case "Inativo":
      return "status-inactive"
    case "Férias":
      return "status-attention"
    default:
      return "status-inactive"
  }
}

const getGoalBadge = (progress: number) => {
  if (progress >= 110) return "status-exceeded"
  if (progress >= 100) return "status-active"
  if (progress >= 80) return "status-on-time"
  if (progress >= 60) return "status-attention"
  return "status-late"
}

const getGoalText = (progress: number) => {
  if (progress >= 110) return "Superou"
  if (progress >= 100) return "Em dia"
  if (progress >= 80) return "Em dia"
  if (progress >= 60) return "Atenção"
  return "Atrasado"
}

export default function Tecnicos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null)

  const filteredTechnicians = techniciansData.filter((technician) => {
    const matchesSearch =
      technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technician.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technician.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || technician.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || technician.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setSpecialtyFilter("all")
  }

  const handleView = (technician: any) => {
    setSelectedTechnician(technician)
    alert(`Visualizar técnico: ${technician.name}
    
Rastreadores Atribuídos: ${technician.assignedTrackers.join(", ")}

Recebidos Recentemente:
${technician.receivedTrackers.map((r: any) => `• ${r.tracker} (${r.date}) - De: ${r.from}`).join("\n")}

Devolvidos Recentemente:
${technician.returnedTrackers.map((r: any) => `• ${r.tracker} (${r.date}) - Para: ${r.to} - ${r.reason}`).join("\n")}`)
  }

  const handleEdit = (technician: any) => {
    alert(`Editar técnico: ${technician.name}`)
  }

  const handleDelete = (technician: any) => {
    if (confirm(`Deseja excluir o técnico ${technician.name}?`)) {
      alert(`Técnico ${technician.name} excluído!`)
    }
  }

  return (
    <>
      <AppSidebar />
      <Header />
      <div className="ml-16 pt-16 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text">Técnicos</h1>
            <p className="text-slate-400 text-lg">Gerencie a equipe de técnicos</p>
          </div>
          <div className="flex gap-3">
            <TechnicianGoalsModal technician={selectedTechnician} />
            <NewTechnicianModal />
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-premium animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Total de Técnicos</p>
                  <p className="text-3xl font-bold text-white">{techniciansData.length}</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">Equipe ativa</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Eficiência Média</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(
                      techniciansData.reduce((acc, tech) => acc + tech.efficiency, 0) / techniciansData.length,
                    )}
                    %
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Acima da meta</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Trabalhos Concluídos</p>
                  <p className="text-3xl font-bold text-white">
                    {techniciansData.reduce((acc, tech) => acc + tech.completedJobs, 0)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">Este mês</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Metas Atingidas</p>
                  <p className="text-3xl font-bold text-white">
                    {techniciansData.filter((tech) => tech.goalProgress >= 100).length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">
                      {Math.round(
                        (techniciansData.filter((tech) => tech.goalProgress >= 100).length / techniciansData.length) *
                          100,
                      )}
                      % da equipe
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar técnicos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-600 text-slate-300"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Férias">Férias</SelectItem>
                </SelectContent>
              </Select>

              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                  <SelectValue placeholder="Especialidade" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Todas as Especialidades</SelectItem>
                  <SelectItem value="Instalação">Instalação</SelectItem>
                  <SelectItem value="Reparo">Reparo</SelectItem>
                  <SelectItem value="Manutenção">Manutenção</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
                onClick={handleClearFilters}
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Técnicos */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="text-white text-xl font-semibold">
              Lista de Técnicos ({filteredTechnicians.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Nome</TableHead>
                    <TableHead className="text-slate-300">Contato</TableHead>
                    <TableHead className="text-slate-300">Especialidade</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Localização</TableHead>
                    <TableHead className="text-slate-300">Eficiência</TableHead>
                    <TableHead className="text-slate-300">Meta</TableHead>
                    <TableHead className="text-slate-300">Rastreadores</TableHead>
                    <TableHead className="text-slate-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTechnicians.map((technician) => (
                    <TableRow key={technician.id} className="table-row">
                      <TableCell>
                        <div>
                          <p className="font-medium text-white">{technician.name}</p>
                          <p className="text-slate-400 text-sm">{technician.experience}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-slate-300 text-sm">{technician.email}</p>
                          <p className="text-slate-400 text-sm">{technician.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{technician.specialty}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(technician.status)}>{technician.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{technician.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{technician.efficiency}%</span>
                          <div className="w-16 h-2 bg-slate-700 rounded-full">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${technician.efficiency}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getGoalBadge(technician.goalProgress)}>
                            {getGoalText(technician.goalProgress)}
                          </Badge>
                          <p className="text-slate-400 text-xs">{technician.goalProgress}%</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-white font-medium">{technician.assignedTrackers.length}</p>
                          <p className="text-slate-400 text-xs">atribuídos</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem
                              className="text-slate-300 hover:bg-slate-700"
                              onClick={() => handleView(technician)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-slate-300 hover:bg-slate-700"
                              onClick={() => handleEdit(technician)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-slate-700"
                              onClick={() => handleDelete(technician)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-slate-400 text-sm">
                Mostrando {filteredTechnicians.length} de {techniciansData.length} técnicos
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
                >
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
