"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Search, Filter, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewTrackerModal } from "@/components/modals/new-tracker-modal"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { BulkTransferModal } from "@/components/modals/bulk-transfer-modal"

const trackersData = [
  {
    id: 1,
    serial: "TR001",
    situation: "Instalado",
    status: "Ativo",
    operator: "Vivo",
    iccid: "8955071234567890123",
    chipNumber: "11987654321",
    location: "São Paulo - SP",
    assigned: "João Silva",
    observations: "Funcionando normalmente",
    client: "Empresa ABC",
  },
  {
    id: 2,
    serial: "TR002",
    situation: "Em Reparo",
    status: "Reparo",
    operator: "Claro",
    iccid: "8955071234567890124",
    chipNumber: "11987654322",
    location: "Rio de Janeiro - RJ",
    assigned: "Maria Santos",
    observations: "Problema na antena GPS",
    client: "Empresa XYZ",
  },
  {
    id: 3,
    serial: "TR003",
    situation: "Estoque",
    status: "Estoque",
    operator: "Tim",
    iccid: "8955071234567890125",
    chipNumber: "11987654323",
    location: "Belo Horizonte - MG",
    assigned: "-",
    observations: "Aguardando instalação",
    client: "-",
  },
  {
    id: 4,
    serial: "TR004",
    situation: "Instalado",
    status: "Ativo",
    operator: "Oi",
    iccid: "8955071234567890126",
    chipNumber: "11987654324",
    location: "Salvador - BA",
    assigned: "Carlos Lima",
    observations: "Recém instalado",
    client: "Empresa DEF",
  },
  {
    id: 5,
    serial: "TR005",
    situation: "Completo",
    status: "Completo",
    operator: "Vivo",
    iccid: "8955071234567890127",
    chipNumber: "11987654325",
    location: "Brasília - DF",
    assigned: "Ana Costa",
    observations: "Serviço finalizado",
    client: "Empresa GHI",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ativo":
      return "status-active"
    case "Reparo":
      return "status-repair"
    case "Estoque":
      return "status-stock"
    case "Completo":
      return "status-complete"
    default:
      return "status-inactive"
  }
}

export default function Rastreadores() {
  const [selectedTrackers, setSelectedTrackers] = useState<number[]>([])
  const [showBulkTransfer, setShowBulkTransfer] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [operatorFilter, setOperatorFilter] = useState("all")

  const filteredTrackers = trackersData.filter((tracker) => {
    const matchesSearch =
      tracker.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracker.iccid.includes(searchTerm) ||
      tracker.chipNumber.includes(searchTerm) ||
      tracker.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || tracker.status === statusFilter
    const matchesOperator = operatorFilter === "all" || tracker.operator === operatorFilter

    return matchesSearch && matchesStatus && matchesOperator
  })

  const handleSelectAll = () => {
    if (selectedTrackers.length === filteredTrackers.length) {
      setSelectedTrackers([])
    } else {
      setSelectedTrackers(filteredTrackers.map((tracker) => tracker.id))
    }
  }

  const handleSelectTracker = (trackerId: number) => {
    setSelectedTrackers((prev) =>
      prev.includes(trackerId) ? prev.filter((id) => id !== trackerId) : [...prev, trackerId],
    )
  }

  const handleBulkTransfer = () => {
    if (selectedTrackers.length === 0) {
      alert("Selecione pelo menos um rastreador para transferir")
      return
    }
    setShowBulkTransfer(true)
  }

  const handleImportCSV = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert(`Arquivo ${file.name} selecionado para importação`)
      }
    }
    input.click()
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setOperatorFilter("all")
  }

  const handleView = (tracker: any) => {
    alert(`Visualizar rastreador: ${tracker.serial}\nStatus: ${tracker.status}\nCliente: ${tracker.client}`)
  }

  const handleEdit = (tracker: any) => {
    alert(`Editar rastreador: ${tracker.serial}`)
  }

  const handleDelete = (tracker: any) => {
    if (confirm(`Deseja excluir o rastreador ${tracker.serial}?`)) {
      alert(`Rastreador ${tracker.serial} excluído!`)
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
              <h1 className="text-3xl font-bold text-white">Rastreadores</h1>
              <p className="text-slate-400">Gerencie todos os rastreadores do sistema</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 bg-transparent"
                onClick={handleImportCSV}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
              <NewTrackerModal />
            </div>
          </div>

          {/* Ações em Lote */}
          {selectedTrackers.length > 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-300">{selectedTrackers.length} rastreador(es) selecionado(s)</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTrackers([])}
                      className="border-slate-600 text-slate-300 bg-transparent"
                    >
                      Limpar Seleção
                    </Button>
                  </div>
                  <Button className="btn-primary" onClick={handleBulkTransfer}>
                    <Upload className="w-4 h-4 mr-2" />
                    Transferir Selecionados
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filtros */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por serial, ICCID, chip..."
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
                    <SelectItem value="Reparo">Reparo</SelectItem>
                    <SelectItem value="Estoque">Estoque</SelectItem>
                    <SelectItem value="Completo">Completo</SelectItem>
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
              <CardTitle className="text-white">Lista de Rastreadores ({filteredTrackers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300 w-12">
                        <input
                          type="checkbox"
                          checked={selectedTrackers.length === filteredTrackers.length && filteredTrackers.length > 0}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                        />
                      </TableHead>
                      <TableHead className="text-slate-300">Serial</TableHead>
                      <TableHead className="text-slate-300">Situação</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Operadora</TableHead>
                      <TableHead className="text-slate-300">ICCID</TableHead>
                      <TableHead className="text-slate-300">Número do Chip</TableHead>
                      <TableHead className="text-slate-300">Localização</TableHead>
                      <TableHead className="text-slate-300">Atribuído</TableHead>
                      <TableHead className="text-slate-300">Cliente</TableHead>
                      <TableHead className="text-slate-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrackers.map((tracker) => (
                      <TableRow key={tracker.id} className="table-row">
                        <TableCell className="w-12">
                          <input
                            type="checkbox"
                            checked={selectedTrackers.includes(tracker.id)}
                            onChange={() => handleSelectTracker(tracker.id)}
                            className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-white">{tracker.serial}</TableCell>
                        <TableCell className="text-slate-300">{tracker.situation}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(tracker.status)}>{tracker.status}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{tracker.operator}</TableCell>
                        <TableCell className="text-slate-300 font-mono text-sm">{tracker.iccid}</TableCell>
                        <TableCell className="text-slate-300">{tracker.chipNumber}</TableCell>
                        <TableCell className="text-slate-300">{tracker.location}</TableCell>
                        <TableCell className="text-slate-300">{tracker.assigned}</TableCell>
                        <TableCell className="text-slate-300">{tracker.client}</TableCell>
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
                                onClick={() => handleView(tracker)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-300 hover:bg-slate-700"
                                onClick={() => handleEdit(tracker)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-slate-700"
                                onClick={() => handleDelete(tracker)}
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
                  Mostrando {filteredTrackers.length} de {trackersData.length} rastreadores
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

      {/* Modal de Transferência em Massa */}
      <BulkTransferModal
        open={showBulkTransfer}
        onClose={() => setShowBulkTransfer(false)}
        selectedTrackers={filteredTrackers.filter((tracker) => selectedTrackers.includes(tracker.id))}
        onTransferComplete={() => {
          setSelectedTrackers([])
          setShowBulkTransfer(false)
        }}
      />
    </>
  )
}
