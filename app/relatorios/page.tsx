"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Cpu,
  DollarSign,
  Clock,
  FileSpreadsheet,
  FileIcon as FilePdf,
} from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

// Mock data for charts
const monthlyData = [
  { month: "Jan", trackers: 45, chips: 52, costs: 15000 },
  { month: "Fev", trackers: 52, chips: 48, costs: 18000 },
  { month: "Mar", trackers: 48, chips: 61, costs: 22000 },
  { month: "Abr", trackers: 61, chips: 55, costs: 19000 },
  { month: "Mai", trackers: 55, chips: 67, costs: 25000 },
  { month: "Jun", trackers: 67, chips: 59, costs: 21000 },
]

const statusData = [
  { name: "Ativo", value: 45, color: "#10b981" },
  { name: "Reparo", value: 12, color: "#f59e0b" },
  { name: "Estoque", value: 23, color: "#3b82f6" },
  { name: "Completo", value: 18, color: "#8b5cf6" },
]

const technicianData = [
  { name: "João Silva", installations: 15, repairs: 3, total: 18 },
  { name: "Maria Santos", installations: 12, repairs: 5, total: 17 },
  { name: "Carlos Lima", installations: 10, repairs: 2, total: 12 },
  { name: "Ana Costa", installations: 8, repairs: 4, total: 12 },
]

const costData = [
  { month: "Jan", trackers: 8500, chips: 6500 },
  { month: "Fev", trackers: 9200, chips: 8800 },
  { month: "Mar", trackers: 11000, chips: 11000 },
  { month: "Abr", trackers: 9800, chips: 9200 },
  { month: "Mai", trackers: 12500, chips: 12500 },
  { month: "Jun", trackers: 10500, chips: 10500 },
]

const reportHistory = [
  {
    id: 1,
    name: "Relatório Mensal - Junho 2024",
    type: "Completo",
    date: "2024-06-30",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: 2,
    name: "Análise de Custos - Q2 2024",
    type: "Custos",
    date: "2024-06-28",
    size: "1.8 MB",
    format: "Excel",
  },
  {
    id: 3,
    name: "Performance Técnicos - Junho",
    type: "Técnicos",
    date: "2024-06-25",
    size: "956 KB",
    format: "PDF",
  },
  {
    id: 4,
    name: "Status Rastreadores - Semanal",
    type: "Rastreadores",
    date: "2024-06-23",
    size: "1.2 MB",
    format: "Excel",
  },
]

export default function Relatorios() {
  const [reportType, setReportType] = useState("complete")
  const [dateRange, setDateRange] = useState("month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("generate")

  const reportTypes = [
    { value: "complete", label: "Relatório Completo", icon: FileText },
    { value: "trackers", label: "Rastreadores", icon: Cpu },
    { value: "technicians", label: "Técnicos", icon: Users },
    { value: "costs", label: "Custos", icon: DollarSign },
    { value: "performance", label: "Performance", icon: TrendingUp },
  ]

  const filterOptions = [
    { id: "active", label: "Apenas Ativos" },
    { id: "repairs", label: "Em Reparo" },
    { id: "stock", label: "Em Estoque" },
    { id: "completed", label: "Completos" },
    { id: "costs", label: "Incluir Custos" },
    { id: "history", label: "Histórico Detalhado" },
  ]

  const handleFilterChange = (filterId: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, filterId])
    } else {
      setSelectedFilters(selectedFilters.filter(id => id !== filterId))
    }
  }

  const handleGenerateReport = async (format: string) => {
    setIsGenerating(true)
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const reportTypeLabel = reportTypes.find(t => t.value === reportType)?.label || "Relatório"
    alert(`${reportTypeLabel} gerado com sucesso em formato ${format}!\nO download será iniciado automaticamente.`)
    
    setIsGenerating(false)
  }

  const handleQuickReport = async (type: string) => {
    setIsGenerating(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const reportNames = {
      daily: "Relatório Diário",
      weekly: "Relatório Semanal", 
      monthly: "Relatório Mensal"
    }
    
    alert(`${reportNames[type as keyof typeof reportNames]} gerado com sucesso!`)
    setIsGenerating(false)
  }

  const handleDownloadHistory = (report: any) => {
    alert(`Baixando: ${report.name}\nFormato: ${report.format}\nTamanho: ${report.size}`)
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
              <h1 className="text-3xl font-bold text-white">Relatórios</h1>
              <p className="text-slate-400">Gere e gerencie relatórios do sistema</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 bg-transparent"
                onClick={() => handleQuickReport("daily")}
                disabled={isGenerating}
              >
                <Clock className="w-4 h-4 mr-2" />
                Relatório Diário
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 bg-transparent"
                onClick={() => handleQuickReport("weekly")}
                disabled={isGenerating}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Relatório Semanal
              </Button>
              <Button
                className="btn-primary"
                onClick={() => handleQuickReport("monthly")}
                disabled={isGenerating}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Relatório Mensal
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="metric-label">Relatórios Gerados</p>
                    <p className="metric-value">127</p>
                    <p className="metric-change positive">+12% este mês</p>
                  </div>
                  <FileText className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="metric-label">Downloads</p>
                    <p className="metric-value">89</p>
                    <p className="metric-change positive">+8% este mês</p>
                  </div>
                  <Download className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="metric-label">Agendados</p>
                    <p className="metric-value">15</p>
                    <p className="metric-change">Próximos 7 dias</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="metric-label">Tamanho Total</p>
                    <p className="metric-value">2.4 GB</p>
                    <p className="metric-change">Últimos 30 dias</p>
                  </div>
                  <FileSpreadsheet className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="generate" className="data-[state=active]:bg-green-600">
                Gerar Relatório
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-green-600">
                Visualizar Dados
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-green-600">
                Histórico
              </TabsTrigger>
            </TabsList>

            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="chart-container">
                    <CardHeader>
                      <CardTitle className="text-white">Configuração do Relatório</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Report Type */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Tipo de Relatório</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {reportTypes.map((type) => (
                            <div
                              key={type.value}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                reportType === type.value
                                  ? "border-green-500 bg-green-500/10"
                                  : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                              }`}
                              onClick={() => setReportType(type.value)}
                            >
                              <div className="flex items-center gap-3">
                                <type.icon className="w-5 h-5 text-green-500" />
                                <span className="text-slate-300 font-medium">{type.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Date Range */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Período</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="week">Última Semana</SelectItem>
                              <SelectItem value="month">Último Mês</SelectItem>
                              <SelectItem value="quarter">Último Trimestre</SelectItem>
                              <SelectItem value="year">Último Ano</SelectItem>
                              <SelectItem value="custom">Personalizado</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          {dateRange === "custom" && (
                            <>
                              <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-slate-900 border-slate-600 text-slate-300"
                              />
                              <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-slate-900 border-slate-600 text-slate-300"
                              />
                            </>
                          )}
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Filtros</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {filterOptions.map((filter) => (
                            <div key={filter.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={filter.id}
                                checked={selectedFilters.includes(filter.id)}
                                onCheckedChange={(checked) => handleFilterChange(filter.id, checked as boolean)}
                                className="border-slate-600 data-[state=checked]:bg-green-600"
                              />
                              <label
                                htmlFor={filter.id}
                                className="text-sm text-slate-300 cursor-pointer"
                              >
                                {filter.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Actions Panel */}
                <div className="space-y-6">
                  <Card className="chart-container">
                    <CardHeader>
                      <CardTitle className="text-white">Gerar Relatório</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <Button
                          className="w-full btn-primary"
                          onClick={() => handleGenerateReport("PDF")}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <div className="loading-spinner mr-2" />
                          ) : (
                            <FilePdf className="w-4 h-4 mr-2" />
                          )}
                          Gerar PDF
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 bg-transparent"
                          onClick={() => handleGenerateReport("Excel")}
                          disabled={isGenerating}
                        >
                          <FileSpreadsheet className="w-4 h-4 mr-2" />
                          Gerar Excel
                        </Button>
                \
