"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import {
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const activitiesData = [
  {
    id: 1,
    type: "Instalação",
    tracker: "TR001",
    technician: "João Silva",
    client: "Empresa ABC",
    location: "São Paulo - SP",
    date: "2024-01-15",
    time: "14:30",
    status: "Concluído",
    duration: "2h 30min",
    observations: "Instalação realizada com sucesso",
  },
  {
    id: 2,
    type: "Reparo",
    tracker: "TR002",
    technician: "Maria Santos",
    client: "Empresa XYZ",
    location: "Rio de Janeiro - RJ",
    date: "2024-01-15",
    time: "09:15",
    status: "Em Andamento",
    duration: "1h 45min",
    observations: "Problema na antena GPS",
  },
  {
    id: 3,
    type: "Manutenção",
    tracker: "TR003",
    technician: "Carlos Lima",
    client: "Empresa DEF",
    location: "Belo Horizonte - MG",
    date: "2024-01-14",
    time: "16:00",
    status: "Concluído",
    duration: "1h 15min",
    observations: "Manutenção preventiva",
  },
  {
    id: 4,
    type: "Instalação",
    tracker: "TR004",
    technician: "Ana Costa",
    client: "Empresa GHI",
    location: "Salvador - BA",
    date: "2024-01-14",
    time: "11:20",
    status: "Pendente",
    duration: "-",
    observations: "Aguardando peças",
  },
  {
    id: 5,
    type: "Remoção",
    tracker: "TR005",
    technician: "Pedro Oliveira",
    client: "Empresa JKL",
    location: "Brasília - DF",
    date: "2024-01-13",
    time: "13:45",
    status: "Concluído",
    duration: "45min",
    observations: "Remoção por fim de contrato",
  },
]

const activityTypeData = [
  { name: "Instalação", value: 45, color: "#22c55e" },
  { name: "Reparo", value: 20, color: "#f59e0b" },
  { name: "Manutenção", value: 25, color: "#3b82f6" },
  { name: "Remoção", value: 10, color: "#ef4444" },
]

const monthlyActivityData = [
  { month: "Jan", instalacoes: 45, reparos: 12, manutencoes: 25, remocoes: 8 },
  { month: "Fev", instalacoes: 52, reparos: 8, manutencoes: 30, remocoes: 10 },
  { month: "Mar", instalacoes: 48, reparos: 15, manutencoes: 22, remocoes: 12 },
  { month: "Abr", instalacoes: 61, reparos: 6, manutencoes: 28, remocoes: 9 },
  { month: "Mai", instalacoes: 55, reparos: 11, manutencoes: 32, remocoes: 7 },
  { month: "Jun", instalacoes: 67, reparos: 4, manutencoes: 35, remocoes: 14 },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Concluído":
      return "status-active"
    case "Em Andamento":
      return "status-attention"
    case "Pendente":
      return "status-late"
    default:
      return "status-inactive"
  }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-sm">
        <p className="text-slate-200 font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-slate-300" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-slate-800/95 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-sm">
        <p className="text-slate-200 font-medium">{data.name}</p>
        <p style={{ color: data.payload.color }} className="font-semibold">
          {data.value} atividades ({((data.value / activityTypeData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}
          %)
        </p>
      </div>
    )
  }
  return null
}

export default function Atividades() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [technicianFilter, setTechnicianFilter] = useState("all")

  const filteredActivities = activitiesData.filter((activity) => {
    const matchesSearch =
      activity.tracker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || activity.status === statusFilter
    const matchesType = typeFilter === "all" || activity.type === typeFilter
    const matchesTechnician = technicianFilter === "all" || activity.technician === technicianFilter

    return matchesSearch && matchesStatus && matchesType && matchesTechnician
  })

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setTypeFilter("all")
    setTechnicianFilter("all")
  }

  const handleExportData = () => {
    const csvContent = [
      [
        "ID",
        "Tipo",
        "Rastreador",
        "Técnico",
        "Cliente",
        "Localização",
        "Data",
        "Hora",
        "Status",
        "Duração",
        "Observações",
      ],
      ...filteredActivities.map((activity) => [
        activity.id,
        activity.type,
        activity.tracker,
        activity.technician,
        activity.client,
        activity.location,
        activity.date,
        activity.time,
        activity.status,
        activity.duration,
        activity.observations,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "atividades.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleView = (activity: any) => {
    alert(
      `Visualizar atividade: ${activity.type} - ${activity.tracker}\nTécnico: ${activity.technician}\nStatus: ${activity.status}`,
    )
  }

  const handleEdit = (activity: any) => {
    alert(`Editar atividade: ${activity.type} - ${activity.tracker}`)
  }

  const handleDelete = (activity: any) => {
    if (confirm(`Deseja excluir a atividade ${activity.type} - ${activity.tracker}?`)) {
      alert(`Atividade ${activity.type} - ${activity.tracker} excluída!`)
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
            <h1 className="text-4xl font-bold gradient-text">Atividades</h1>
            <p className="text-slate-400 text-lg">Acompanhe todas as atividades realizadas</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-premium animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Total de Atividades</p>
                  <p className="text-3xl font-bold text-white">{activitiesData.length}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">+15% este mês</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Concluídas</p>
                  <p className="text-3xl font-bold text-white">
                    {activitiesData.filter((a) => a.status === "Concluído").length}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">
                      {Math.round(
                        (activitiesData.filter((a) => a.status === "Concluído").length / activitiesData.length) * 100,
                      )}
                      % do total
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Em Andamento</p>
                  <p className="text-3xl font-bold text-white">
                    {activitiesData.filter((a) => a.status === "Em Andamento").length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">Ativas agora</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Pendentes</p>
                  <p className="text-3xl font-bold text-white">
                    {activitiesData.filter((a) => a.status === "Pendente").length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">Requer atenção</span>
                  </div>
                </div>
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribuição por Tipo */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Distribuição por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {activityTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {activityTypeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <p className="text-slate-300 text-sm">{item.name}</p>
                      <p className="text-white font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Atividades Mensais */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Atividades Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="instalacoes" fill="#22c55e" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="reparos" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="manutencoes" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="remocoes" fill="#ef4444" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar atividades..."
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
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="Instalação">Instalação</SelectItem>
                  <SelectItem value="Reparo">Reparo</SelectItem>
                  <SelectItem value="Manutenção">Manutenção</SelectItem>
                  <SelectItem value="Remoção">Remoção</SelectItem>
                </SelectContent>
              </Select>

              <Select value={technicianFilter} onValueChange={setTechnicianFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                  <SelectValue placeholder="Técnico" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Todos os Técnicos</SelectItem>
                  <SelectItem value="João Silva">João Silva</SelectItem>
                  <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                  <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                  <SelectItem value="Ana Costa">Ana Costa</SelectItem>
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

        {/* Tabela de Atividades */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="text-white text-xl font-semibold">
              Lista de Atividades ({filteredActivities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Tipo</TableHead>
                    <TableHead className="text-slate-300">Rastreador</TableHead>
                    <TableHead className="text-slate-300">Técnico</TableHead>
                    <TableHead className="text-slate-300">Cliente</TableHead>
                    <TableHead className="text-slate-300">Localização</TableHead>
                    <TableHead className="text-slate-300">Data/Hora</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Duração</TableHead>
                    <TableHead className="text-slate-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity) => (
                    <TableRow key={activity.id} className="table-row">
                      <TableCell className="font-medium text-white">{activity.type}</TableCell>
                      <TableCell className="text-slate-300">{activity.tracker}</TableCell>
                      <TableCell className="text-slate-300">{activity.technician}</TableCell>
                      <TableCell className="text-slate-300">{activity.client}</TableCell>
                      <TableCell className="text-slate-300">{activity.location}</TableCell>
                      <TableCell className="text-slate-300">
                        {activity.date} {activity.time}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(activity.status)}>{activity.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{activity.duration}</TableCell>
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
                              onClick={() => handleView(activity)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-slate-300 hover:bg-slate-700"
                              onClick={() => handleEdit(activity)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-slate-700"
                              onClick={() => handleDelete(activity)}
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
                Mostrando {filteredActivities.length} de {activitiesData.length} atividades
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
