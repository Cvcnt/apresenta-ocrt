"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import { Activity, MapPin, Smartphone, Users, TrendingUp, AlertTriangle, CheckCircle, Star } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const statusData = [
  { name: "Ativos", value: 45, color: "#22c55e" },
  { name: "Em Reparo", value: 8, color: "#f59e0b" },
  { name: "Estoque", value: 12, color: "#3b82f6" },
  { name: "Completos", value: 25, color: "#8b5cf6" },
]

const operatorData = [
  { name: "Vivo", value: 35, color: "#8b5cf6" },
  { name: "Claro", value: 25, color: "#ef4444" },
  { name: "Tim", value: 20, color: "#3b82f6" },
  { name: "Oi", value: 10, color: "#f59e0b" },
]

const monthlyData = [
  { month: "Jan", instalacoes: 45, reparos: 12, completos: 38 },
  { month: "Fev", instalacoes: 52, reparos: 8, completos: 44 },
  { month: "Mar", instalacoes: 48, reparos: 15, completos: 41 },
  { month: "Abr", instalacoes: 61, reparos: 6, completos: 55 },
  { month: "Mai", instalacoes: 55, reparos: 11, completos: 48 },
  { month: "Jun", instalacoes: 67, reparos: 4, completos: 62 },
]

const performanceData = [
  { month: "Jan", eficiencia: 85 },
  { month: "Fev", eficiencia: 88 },
  { month: "Mar", eficiencia: 82 },
  { month: "Abr", eficiencia: 92 },
  { month: "Mai", eficiencia: 89 },
  { month: "Jun", eficiencia: 94 },
]

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
          {data.value} unidades ({((data.value / statusData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)
        </p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  return (
    <>
      <AppSidebar />
      <Header />
      <div className="ml-16 pt-16 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
            <p className="text-slate-400 text-lg">Visão geral do sistema de rastreamento</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={selectedPeriod === "7d" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("7d")}
              className={
                selectedPeriod === "7d"
                  ? "btn-primary"
                  : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
              }
            >
              7 dias
            </Button>
            <Button
              variant={selectedPeriod === "30d" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("30d")}
              className={
                selectedPeriod === "30d"
                  ? "btn-primary"
                  : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
              }
            >
              30 dias
            </Button>
            <Button
              variant={selectedPeriod === "90d" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("90d")}
              className={
                selectedPeriod === "90d"
                  ? "btn-primary"
                  : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
              }
            >
              90 dias
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-premium animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Total de Rastreadores</p>
                  <p className="text-3xl font-bold text-white">90</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">+12% este mês</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Ativos</p>
                  <p className="text-3xl font-bold text-white">45</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">50% do total</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Chips Ativos</p>
                  <p className="text-3xl font-bold text-white">78</p>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">12 vencendo</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Smartphone className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Técnicos</p>
                  <p className="text-3xl font-bold text-white">8</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">94% eficiência</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status dos Rastreadores */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Status dos Rastreadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {statusData.map((item, index) => (
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

          {/* Distribuição por Operadora */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Distribuição por Operadora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={operatorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {operatorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {operatorData.map((item, index) => (
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
        </div>

        {/* Gráficos de Linha e Barra */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Atividades Mensais */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Atividades Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="instalacoes" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="reparos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completos" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl font-semibold">Eficiência Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="eficiencia"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ fill: "#22c55e", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#22c55e", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <Card className="card-premium">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl font-semibold">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Instalação",
                  tracker: "TR001",
                  technician: "João Silva",
                  time: "2 min atrás",
                  status: "success",
                },
                {
                  action: "Reparo",
                  tracker: "TR045",
                  technician: "Maria Santos",
                  time: "15 min atrás",
                  status: "warning",
                },
                {
                  action: "Transferência",
                  tracker: "TR023",
                  technician: "Carlos Lima",
                  time: "1h atrás",
                  status: "info",
                },
                { action: "Conclusão", tracker: "TR067", technician: "Ana Costa", time: "2h atrás", status: "success" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-400"
                        : activity.status === "warning"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {activity.action} - {activity.tracker}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {activity.technician} • {activity.time}
                    </p>
                  </div>
                  <Badge
                    className={
                      activity.status === "success"
                        ? "status-active"
                        : activity.status === "warning"
                          ? "status-attention"
                          : "status-stock"
                    }
                  >
                    {activity.action}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
