"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, Calendar, Clock, MapPin, User, FileText } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const historyData = [
  {
    id: 1,
    datetime: "2024-01-16 14:30:25",
    type: "Instalação",
    technician: "João Silva",
    equipment: "TR001",
    location: "São Paulo - SP",
    assigned: "Empresa ABC",
    observations: "Instalação realizada com sucesso no veículo Corolla placa ABC-1234",
  },
  {
    id: 2,
    datetime: "2024-01-16 10:15:42",
    type: "Manutenção",
    technician: "Maria Santos",
    equipment: "TR002",
    location: "Rio de Janeiro - RJ",
    assigned: "Empresa XYZ",
    observations: "Substituição da antena GPS devido a problemas de sinal",
  },
  {
    id: 3,
    datetime: "2024-01-15 16:45:18",
    type: "Remoção",
    technician: "Carlos Lima",
    equipment: "TR008",
    location: "Belo Horizonte - MG",
    assigned: "Empresa DEF",
    observations: "Equipamento removido conforme solicitação do cliente",
  },
  {
    id: 4,
    datetime: "2024-01-15 09:20:33",
    type: "Reparo",
    technician: "Ana Costa",
    equipment: "TR005",
    location: "Salvador - BA",
    assigned: "Empresa GHI",
    observations: "Reparo na fonte de alimentação - problema resolvido",
  },
  {
    id: 5,
    datetime: "2024-01-14 13:10:55",
    type: "Instalação",
    technician: "Pedro Oliveira",
    equipment: "TR012",
    location: "Brasília - DF",
    assigned: "Empresa JKL",
    observations: "Primeira instalação no cliente - configuração inicial completa",
  },
  {
    id: 6,
    datetime: "2024-01-14 11:30:12",
    type: "Configuração",
    technician: "João Silva",
    equipment: "TR003",
    location: "São Paulo - SP",
    assigned: "Empresa MNO",
    observations: "Atualização de firmware e configuração de parâmetros",
  },
  {
    id: 7,
    datetime: "2024-01-13 15:45:28",
    type: "Teste",
    technician: "Maria Santos",
    equipment: "TR007",
    location: "Rio de Janeiro - RJ",
    assigned: "Empresa PQR",
    observations: "Teste de funcionamento após reparo - todos os sistemas OK",
  },
  {
    id: 8,
    datetime: "2024-01-13 08:20:44",
    type: "Entrega",
    technician: "Carlos Lima",
    equipment: "TR015",
    location: "Belo Horizonte - MG",
    assigned: "Empresa STU",
    observations: "Entrega de equipamento novo para instalação posterior",
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case "Instalação":
      return "status-active"
    case "Manutenção":
      return "status-stock"
    case "Remoção":
      return "status-repair"
    case "Reparo":
      return "status-repair"
    case "Configuração":
      return "status-complete"
    case "Teste":
      return "status-complete"
    case "Entrega":
      return "status-active"
    default:
      return "status-inactive"
  }
}

export default function Historico() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [technicianFilter, setTechnicianFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch =
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.observations.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assigned.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesTechnician = technicianFilter === "all" || item.technician === technicianFilter
    const matchesLocation = locationFilter === "all" || item.location.includes(locationFilter)

    return matchesSearch && matchesType && matchesTechnician && matchesLocation
  })

  return (
    <>
      <AppSidebar />
      <Header />
      <div className="ml-64 pt-16 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Histórico</h1>
              <p className="text-slate-400">Histórico completo de todas as atividades do sistema</p>
            </div>
            <Button className="btn-primary">
              <Download className="w-4 h-4 mr-2" />
              Exportar Histórico
            </Button>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Total de Registros</p>
                    <p className="text-3xl font-bold text-white mt-2">{historyData.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Esta Semana</p>
                    <p className="text-3xl font-bold text-white mt-2">12</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <Calendar className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Técnicos Ativos</p>
                    <p className="text-3xl font-bold text-white mt-2">5</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Localizações</p>
                    <p className="text-3xl font-bold text-white mt-2">8</p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-500/20">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros Avançados */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Filtros Avançados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900 border-slate-600 text-slate-300"
                  />
                </div>

                <Input
                  type="date"
                  placeholder="Data inicial"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-slate-300"
                />

                <Input
                  type="date"
                  placeholder="Data final"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-slate-300"
                />

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="Instalação">Instalação</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Remoção">Remoção</SelectItem>
                    <SelectItem value="Reparo">Reparo</SelectItem>
                    <SelectItem value="Configuração">Configuração</SelectItem>
                    <SelectItem value="Teste">Teste</SelectItem>
                    <SelectItem value="Entrega">Entrega</SelectItem>
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
                    <SelectItem value="Pedro Oliveira">Pedro Oliveira</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setTypeFilter("all")
                    setTechnicianFilter("all")
                    setLocationFilter("all")
                    setStartDate("")
                    setEndDate("")
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Histórico */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Registros do Histórico ({filteredHistory.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Data/Hora</TableHead>
                      <TableHead className="text-slate-300">Tipo</TableHead>
                      <TableHead className="text-slate-300">Técnico</TableHead>
                      <TableHead className="text-slate-300">Equipamento</TableHead>
                      <TableHead className="text-slate-300">Localização</TableHead>
                      <TableHead className="text-slate-300">Atribuído</TableHead>
                      <TableHead className="text-slate-300">Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((item) => (
                      <TableRow key={item.id} className="table-row">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-slate-300 font-medium">
                                {new Date(item.datetime).toLocaleDateString("pt-BR")}
                              </p>
                              <p className="text-slate-400 text-sm">
                                {new Date(item.datetime).toLocaleTimeString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-green-400" />
                            <span className="text-slate-300">{item.technician}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300 font-mono">{item.equipment}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="text-slate-300">{item.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">{item.assigned}</TableCell>
                        <TableCell className="text-slate-300 max-w-xs">
                          <p className="truncate" title={item.observations}>
                            {item.observations}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginação */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-slate-400 text-sm">
                  Mostrando {filteredHistory.length} de {historyData.length} registros
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                    Próximo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
