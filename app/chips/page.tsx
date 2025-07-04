"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Search, Filter, MoreHorizontal, Edit, Eye, Power, Smartphone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewChipModal } from "@/components/modals/new-chip-modal"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const chipsData = [
  {
    id: 1,
    operator: "Vivo",
    status: "Ativo",
    iccid: "8955071234567890123",
    number: "11987654321",
    plan: "Dados 1GB",
    assignedTo: "TR001",
    activationDate: "2024-01-10",
  },
  {
    id: 2,
    operator: "Claro",
    status: "Ativo",
    iccid: "8955071234567890124",
    number: "11987654322",
    plan: "Dados 2GB",
    assignedTo: "TR002",
    activationDate: "2024-01-08",
  },
  {
    id: 3,
    operator: "Tim",
    status: "Inativo",
    iccid: "8955071234567890125",
    number: "11987654323",
    plan: "Dados 1GB",
    assignedTo: "-",
    activationDate: "2023-12-15",
  },
  {
    id: 4,
    operator: "Oi",
    status: "Ativo",
    iccid: "8955071234567890126",
    number: "11987654324",
    plan: "Dados 3GB",
    assignedTo: "TR004",
    activationDate: "2024-01-12",
  },
  {
    id: 5,
    operator: "Vivo",
    status: "Ativo",
    iccid: "8955071234567890127",
    number: "11987654325",
    plan: "Dados 1GB",
    assignedTo: "TR005",
    activationDate: "2024-01-14",
  },
  {
    id: 6,
    operator: "Claro",
    status: "Inativo",
    iccid: "8955071234567890128",
    number: "11987654326",
    plan: "Dados 2GB",
    assignedTo: "-",
    activationDate: "2023-11-20",
  },
]

const getStatusBadge = (status: string) => {
  return status === "Ativo" ? "status-active" : "status-inactive"
}

const getOperatorColor = (operator: string) => {
  switch (operator) {
    case "Vivo":
      return "bg-purple-500/20 text-purple-400"
    case "Claro":
      return "bg-red-500/20 text-red-400"
    case "Tim":
      return "bg-blue-500/20 text-blue-400"
    case "Oi":
      return "bg-yellow-500/20 text-yellow-400"
    default:
      return "bg-gray-500/20 text-gray-400"
  }
}

export default function Chips() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [operatorFilter, setOperatorFilter] = useState("all")

  const filteredChips = chipsData.filter((chip) => {
    const matchesSearch =
      chip.iccid.includes(searchTerm) ||
      chip.number.includes(searchTerm) ||
      chip.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || chip.status === statusFilter
    const matchesOperator = operatorFilter === "all" || chip.operator === operatorFilter

    return matchesSearch && matchesStatus && matchesOperator
  })

  const activeChips = chipsData.filter((chip) => chip.status === "Ativo").length
  const inactiveChips = chipsData.filter((chip) => chip.status === "Inativo").length

  const handleBulkAdd = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert(`Arquivo ${file.name} selecionado para importação em lote`)
      }
    }
    input.click()
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setOperatorFilter("all")
  }

  const handleView = (chip: any) => {
    alert(`Visualizar chip: ${chip.iccid}\nOperadora: ${chip.operator}\nStatus: ${chip.status}`)
  }

  const handleEdit = (chip: any) => {
    alert(`Editar chip: ${chip.iccid}`)
  }

  const handleToggleStatus = (chip: any) => {
    const newStatus = chip.status === "Ativo" ? "Inativo" : "Ativo"
    if (confirm(`Deseja ${newStatus === "Ativo" ? "ativar" : "desativar"} o chip ${chip.iccid}?`)) {
      alert(`Chip ${chip.iccid} ${newStatus === "Ativo" ? "ativado" : "desativado"}!`)
    }
  }

  return (
    <>
      <AppSidebar />
      <Header />
      <div className="ml-16 pt-16 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Chips</h1>
              <p className="text-slate-400">Gerencie todos os chips do sistema</p>
            </div>
            <div className="flex gap-3">
              <Button className="btn-secondary" onClick={handleBulkAdd}>
                <Upload className="w-4 h-4 mr-2" />
                Adicionar em Lote
              </Button>
              <NewChipModal />
            </div>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
              onClick={() => alert(`Total de Chips: ${chipsData.length}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Total de Chips</p>
                    <p className="text-3xl font-bold text-white mt-2">{chipsData.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Smartphone className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
              onClick={() => alert(`Chips Ativos: ${activeChips}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Chips Ativos</p>
                    <p className="text-3xl font-bold text-white mt-2">{activeChips}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <Power className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
              onClick={() => alert(`Chips Inativos: ${inactiveChips}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Chips Inativos</p>
                    <p className="text-3xl font-bold text-white mt-2">{inactiveChips}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/20">
                    <Power className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
              onClick={() => alert(`Taxa de Utilização: ${Math.round((activeChips / chipsData.length) * 100)}%`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Taxa de Utilização</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {Math.round((activeChips / chipsData.length) * 100)}%
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500/20">
                    <Smartphone className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por ICCID ou número..."
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
                  </SelectContent>
                </Select>

                <Select value={operatorFilter} onValueChange={setOperatorFilter}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                    <SelectValue placeholder="Operadora" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Todas as Operadoras</SelectItem>
                    <SelectItem value="Vivo">Vivo</SelectItem>
                    <SelectItem value="Claro">Claro</SelectItem>
                    <SelectItem value="Tim">Tim</SelectItem>
                    <SelectItem value="Oi">Oi</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 bg-transparent"
                  onClick={handleClearFilters}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Lista de Chips ({filteredChips.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Operadora</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">ICCID</TableHead>
                      <TableHead className="text-slate-300">Número</TableHead>
                      <TableHead className="text-slate-300">Plano</TableHead>
                      <TableHead className="text-slate-300">Atribuído</TableHead>
                      <TableHead className="text-slate-300">Ativação</TableHead>
                      <TableHead className="text-slate-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChips.map((chip) => (
                      <TableRow key={chip.id} className="table-row">
                        <TableCell>
                          <Badge className={getOperatorColor(chip.operator)}>{chip.operator}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(chip.status)}>{chip.status}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-300 font-mono text-sm">{chip.iccid}</TableCell>
                        <TableCell className="text-slate-300">{chip.number}</TableCell>
                        <TableCell className="text-slate-300">{chip.plan}</TableCell>
                        <TableCell className="text-slate-300">
                          {chip.assignedTo !== "-" ? (
                            <span className="font-medium">{chip.assignedTo}</span>
                          ) : (
                            <span className="text-slate-500">Não atribuído</span>
                          )}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {new Date(chip.activationDate).toLocaleDateString("pt-BR")}
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
                                onClick={() => handleView(chip)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-300 hover:bg-slate-700"
                                onClick={() => handleEdit(chip)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className={
                                  chip.status === "Ativo"
                                    ? "text-red-400 hover:bg-slate-700"
                                    : "text-green-400 hover:bg-slate-700"
                                }
                                onClick={() => handleToggleStatus(chip)}
                              >
                                <Power className="w-4 h-4 mr-2" />
                                {chip.status === "Ativo" ? "Desativar" : "Ativar"}
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
                  Mostrando {filteredChips.length} de {chipsData.length} chips
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 bg-transparent"
                    onClick={() => alert("Página anterior")}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 bg-transparent"
                    onClick={() => alert("Próxima página")}
                  >
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
