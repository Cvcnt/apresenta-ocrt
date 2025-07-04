"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"
import { Download, MoreHorizontal, Edit, Trash2, DollarSign, TrendingUp, TrendingDown, Calculator } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewTrackerCostModal } from "@/components/modals/new-tracker-cost-modal"
import { NewChipCostModal } from "@/components/modals/new-chip-cost-modal"
import { EditTrackerCostModal } from "@/components/modals/edit-tracker-cost-modal"
import { EditChipCostModal } from "@/components/modals/edit-chip-cost-modal"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const trackerCostsData = [
  {
    id: 1,
    model: "GT06N",
    supplier: "Fornecedor A",
    unitCost: 85.5,
    quantity: 50,
    totalCost: 4275.0,
    purchaseDate: "2024-01-15",
    status: "Ativo",
  },
  {
    id: 2,
    model: "ST901",
    supplier: "Fornecedor B",
    unitCost: 120.0,
    quantity: 30,
    totalCost: 3600.0,
    purchaseDate: "2024-01-10",
    status: "Ativo",
  },
  {
    id: 3,
    model: "TK103",
    supplier: "Fornecedor C",
    unitCost: 95.75,
    quantity: 25,
    totalCost: 2393.75,
    purchaseDate: "2024-01-05",
    status: "Descontinuado",
  },
]

const chipCostsData = [
  {
    id: 1,
    operator: "Vivo",
    plan: "Controle 5GB",
    monthlyCost: 45.9,
    quantity: 35,
    totalMonthlyCost: 1606.5,
    contractDate: "2024-01-01",
    status: "Ativo",
  },
  {
    id: 2,
    operator: "Claro",
    plan: "Pós 3GB",
    monthlyCost: 39.9,
    quantity: 25,
    totalMonthlyCost: 997.5,
    contractDate: "2023-12-15",
    status: "Ativo",
  },
  {
    id: 3,
    operator: "Tim",
    plan: "Controle 4GB",
    monthlyCost: 42.5,
    quantity: 20,
    totalMonthlyCost: 850.0,
    contractDate: "2023-12-01",
    status: "Ativo",
  },
]

const monthlyEvolutionData = [
  { month: "Jan", trackers: 4275, chips: 3454, total: 7729 },
  { month: "Fev", trackers: 3600, chips: 3454, total: 7054 },
  { month: "Mar", trackers: 2394, chips: 3454, total: 5848 },
  { month: "Abr", trackers: 5200, chips: 3454, total: 8654 },
  { month: "Mai", trackers: 1800, chips: 3454, total: 5254 },
  { month: "Jun", trackers: 6500, chips: 3454, total: 9954 },
]

const supplierData = [
  { name: "Fornecedor A", value: 4275, color: "#22c55e" },
  { name: "Fornecedor B", value: 3600, color: "#3b82f6" },
  { name: "Fornecedor C", value: 2394, color: "#f59e0b" },
]

const operatorData = [
  { name: "Vivo", value: 1606.5, color: "#8b5cf6" },
  { name: "Claro", value: 997.5, color: "#ef4444" },
  { name: "Tim", value: 850.0, color: "#06b6d4" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-sm">
        <p className="text-slate-200 font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-slate-300" style={{ color: entry.color }}>
            {entry.name}: R$ {entry.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
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
          R$ {data.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>
    )
  }
  return null
}

export default function Custos() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [operatorFilter, setOperatorFilter] = useState("all")
  const [editingTracker, setEditingTracker] = useState<any>(null)
  const [editingChip, setEditingChip] = useState<any>(null)

  const totalTrackerCosts = trackerCostsData.reduce((acc, item) => acc + item.totalCost, 0)
  const totalChipCosts = chipCostsData.reduce((acc, item) => acc + item.totalMonthlyCost, 0)
  const totalMonthlyCosts = totalChipCosts
  const averageTrackerCost = totalTrackerCosts / trackerCostsData.reduce((acc, item) => acc + item.quantity, 0)

  const handleDownloadComplete = () => {
    const allData = [
      ["Tipo", "Item", "Fornecedor/Operadora", "Custo Unitário", "Quantidade", "Custo Total", "Data", "Status"],
      ...trackerCostsData.map((item) => [
        "Rastreador",
        item.model,
        item.supplier,
        `R$ ${item.unitCost.toFixed(2)}`,
        item.quantity,
        `R$ ${item.totalCost.toFixed(2)}`,
        item.purchaseDate,
        item.status,
      ]),
      ...chipCostsData.map((item) => [
        "Chip",
        item.plan,
        item.operator,
        `R$ ${item.monthlyCost.toFixed(2)}`,
        item.quantity,
        `R$ ${item.totalMonthlyCost.toFixed(2)}`,
        item.contractDate,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([allData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "relatorio_custos_completo.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    alert("Relatório completo baixado com sucesso!")
  }

  const handleDownloadTrackers = () => {
    const csvContent = [
      ["Modelo", "Fornecedor", "Custo Unitário", "Quantidade", "Custo Total", "Data de Compra", "Status"],
      ...trackerCostsData.map((item) => [
        item.model,
        item.supplier,
        `R$ ${item.unitCost.toFixed(2)}`,
        item.quantity,
        `R$ ${item.totalCost.toFixed(2)}`,
        item.purchaseDate,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "relatorio_custos_rastreadores.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    alert("Relatório de rastreadores baixado com sucesso!")
  }

  const handleDownloadChips = () => {
    const csvContent = [
      ["Operadora", "Plano", "Custo Mensal", "Quantidade", "Custo Total Mensal", "Data do Contrato", "Status"],
      ...chipCostsData.map((item) => [
        item.operator,
        item.plan,
        `R$ ${item.monthlyCost.toFixed(2)}`,
        item.quantity,
        `R$ ${item.totalMonthlyCost.toFixed(2)}`,
        item.contractDate,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "relatorio_custos_chips.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    alert("Relatório de chips baixado com sucesso!")
  }

  const handleEditTracker = (tracker: any) => {
    setEditingTracker(tracker)
  }

  const handleEditChip = (chip: any) => {
    setEditingChip(chip)
  }

  const handleDeleteTracker = (tracker: any) => {
    if (confirm(`Deseja excluir o custo do rastreador ${tracker.model}?`)) {
      alert(`Custo do rastreador ${tracker.model} excluído!`)
    }
  }

  const handleDeleteChip = (chip: any) => {
    if (confirm(`Deseja excluir o custo do chip ${chip.operator} - ${chip.plan}?`)) {
      alert(`Custo do chip ${chip.operator} - ${chip.plan} excluído!`)
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
            <h1 className="text-4xl font-bold gradient-text">Gestão de Custos</h1>
            <p className="text-slate-400 text-lg">Controle financeiro de rastreadores e chips</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
              onClick={handleDownloadComplete}
            >
              <Download className="w-4 h-4 mr-2" />
              Relatório Completo
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-premium animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Custo Total Rastreadores</p>
                  <p className="text-3xl font-bold text-white">
                    R$ {totalTrackerCosts.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Investimento total</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Custo Mensal Chips</p>
                  <p className="text-3xl font-bold text-white">
                    R$ {totalMonthlyCosts.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">Custo recorrente</span>
                  </div>
                </div>
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <DollarSign className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Custo Médio Rastreador</p>
                  <p className="text-3xl font-bold text-white">
                    R$ {averageTrackerCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">Por unidade</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Calculator className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Economia Potencial</p>
                  <p className="text-3xl font-bold text-white">R$ 1.250,00</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">Otimização</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Evolução Mensal */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Evolução Mensal de Custos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="trackers"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                      name="Rastreadores"
                    />
                    <Line
                      type="monotone"
                      dataKey="chips"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                      name="Chips"
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      name="Total"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Análise por Fornecedor */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Análise por Fornecedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={supplierData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {supplierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 gap-3 mt-4">
                {supplierData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <p className="text-slate-300 text-sm">{item.name}</p>
                      <p className="text-white font-semibold">
                        R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={
              activeTab === "overview"
                ? "btn-primary"
                : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
            }
          >
            Visão Geral
          </Button>
          <Button
            variant={activeTab === "trackers" ? "default" : "outline"}
            onClick={() => setActiveTab("trackers")}
            className={
              activeTab === "trackers"
                ? "btn-primary"
                : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
            }
          >
            Rastreadores
          </Button>
          <Button
            variant={activeTab === "chips" ? "default" : "outline"}
            onClick={() => setActiveTab("chips")}
            className={
              activeTab === "chips"
                ? "btn-primary"
                : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
            }
          >
            Chips
          </Button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === "trackers" && (
          <div className="space-y-6">
            {/* Header Rastreadores */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Gestão de Custos - Rastreadores</h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
                  onClick={handleDownloadTrackers}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Relatório
                </Button>
                <NewTrackerCostModal />
              </div>
            </div>

            {/* Tabela Rastreadores */}
            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Modelo</TableHead>
                        <TableHead className="text-slate-300">Fornecedor</TableHead>
                        <TableHead className="text-slate-300">Custo Unitário</TableHead>
                        <TableHead className="text-slate-300">Quantidade</TableHead>
                        <TableHead className="text-slate-300">Custo Total</TableHead>
                        <TableHead className="text-slate-300">Data de Compra</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trackerCostsData.map((tracker) => (
                        <TableRow key={tracker.id} className="table-row">
                          <TableCell className="font-medium text-white">{tracker.model}</TableCell>
                          <TableCell className="text-slate-300">{tracker.supplier}</TableCell>
                          <TableCell className="text-slate-300">
                            R$ {tracker.unitCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-slate-300">{tracker.quantity}</TableCell>
                          <TableCell className="text-slate-300 font-semibold">
                            R$ {tracker.totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-slate-300">{tracker.purchaseDate}</TableCell>
                          <TableCell>
                            <Badge className={tracker.status === "Ativo" ? "status-active" : "status-inactive"}>
                              {tracker.status}
                            </Badge>
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
                                  onClick={() => handleEditTracker(tracker)}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-400 hover:bg-slate-700"
                                  onClick={() => handleDeleteTracker(tracker)}
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
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "chips" && (
          <div className="space-y-6">
            {/* Header Chips */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Gestão de Custos - Chips</h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
                  onClick={handleDownloadChips}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Relatório
                </Button>
                <NewChipCostModal />
              </div>
            </div>

            {/* Gráfico Operadoras */}
            <Card className="card-premium">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-xl font-semibold">Custos por Operadora</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={operatorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tabela Chips */}
            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Operadora</TableHead>
                        <TableHead className="text-slate-300">Plano</TableHead>
                        <TableHead className="text-slate-300">Custo Mensal</TableHead>
                        <TableHead className="text-slate-300">Quantidade</TableHead>
                        <TableHead className="text-slate-300">Custo Total Mensal</TableHead>
                        <TableHead className="text-slate-300">Data do Contrato</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chipCostsData.map((chip) => (
                        <TableRow key={chip.id} className="table-row">
                          <TableCell className="font-medium text-white">{chip.operator}</TableCell>
                          <TableCell className="text-slate-300">{chip.plan}</TableCell>
                          <TableCell className="text-slate-300">
                            R$ {chip.monthlyCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-slate-300">{chip.quantity}</TableCell>
                          <TableCell className="text-slate-300 font-semibold">
                            R$ {chip.totalMonthlyCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-slate-300">{chip.contractDate}</TableCell>
                          <TableCell>
                            <Badge className={chip.status === "Ativo" ? "status-active" : "status-inactive"}>
                              {chip.status}
                            </Badge>
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
                                  onClick={() => handleEditChip(chip)}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-400 hover:bg-slate-700"
                                  onClick={() => handleDeleteChip(chip)}
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Modals de Edição */}
      {editingTracker && <EditTrackerCostModal tracker={editingTracker} onClose={() => setEditingTracker(null)} />}

      {editingChip && <EditChipCostModal chip={editingChip} onClose={() => setEditingChip(null)} />}
    </>
  )
}
