"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Calculator } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

const costData = {
  trackers: {
    total: 23,
    totalCost: 34500,
    averageCost: 1500,
    monthlyCost: 2875,
    breakdown: [
      { model: "Modelo A", quantity: 8, unitCost: 1200, totalCost: 9600 },
      { model: "Modelo B", quantity: 10, unitCost: 1500, totalCost: 15000 },
      { model: "Modelo C", quantity: 5, unitCost: 1800, totalCost: 9000 },
    ],
  },
  chips: {
    total: 25,
    monthlyTotal: 1250,
    averageMonthly: 50,
    breakdown: [
      { operator: "Vivo", quantity: 8, monthlyCost: 40, totalCost: 320 },
      { operator: "Claro", quantity: 7, monthlyCost: 45, totalCost: 315 },
      { operator: "Tim", quantity: 6, monthlyCost: 50, totalCost: 300 },
      { operator: "Oi", quantity: 4, monthlyCost: 55, totalCost: 220 },
    ],
  },
}

const monthlyTrend = [
  { month: "Jan", trackers: 2800, chips: 1100 },
  { month: "Fev", trackers: 3200, chips: 1150 },
  { month: "Mar", trackers: 2900, chips: 1200 },
  { month: "Abr", trackers: 3100, chips: 1180 },
  { month: "Mai", trackers: 2750, chips: 1220 },
  { month: "Jun", trackers: 2875, chips: 1250 },
]

const pieColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export function CostAnalysisModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Análise de Custos</p>
                <p className="text-3xl font-bold text-white mt-2">R$ 4.125</p>
                <p className="text-sm text-slate-400 mt-1">Custo mensal total</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Análise Detalhada de Custos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo Geral */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Custo Total Rastreadores</p>
                    <p className="text-xl font-bold text-white">R$ {costData.trackers.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Custo Mensal Chips</p>
                    <p className="text-xl font-bold text-white">R$ {costData.chips.monthlyTotal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Custo Médio/Rastreador</p>
                    <p className="text-xl font-bold text-white">R$ {costData.trackers.averageCost}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Custo Médio/Chip</p>
                    <p className="text-xl font-bold text-white">R$ {costData.chips.averageMonthly}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição de Custos - Rastreadores */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Custos por Modelo de Rastreador</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={costData.trackers.breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="totalCost"
                      nameKey="model"
                    >
                      {costData.trackers.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`R$ ${value.toLocaleString()}`, "Custo Total"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribuição de Custos - Chips */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Custos Mensais por Operadora</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={costData.chips.breakdown}>
                    <XAxis dataKey="operator" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`R$ ${value}`, "Custo Mensal"]}
                    />
                    <Bar dataKey="totalCost" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tendência Mensal */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Evolução de Custos Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrend}>
                  <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="trackers" fill="#10b981" name="Rastreadores" />
                  <Bar dataKey="chips" fill="#3b82f6" name="Chips" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detalhamento */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detalhes Rastreadores */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Detalhamento - Rastreadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costData.trackers.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{item.model}</p>
                        <p className="text-sm text-slate-400">{item.quantity} unidades</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">R$ {item.totalCost.toLocaleString()}</p>
                        <p className="text-sm text-slate-400">R$ {item.unitCost}/un</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detalhes Chips */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Detalhamento - Chips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costData.chips.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{item.operator}</p>
                        <p className="text-sm text-slate-400">{item.quantity} chips ativos</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">R$ {item.totalCost}/mês</p>
                        <p className="text-sm text-slate-400">R$ {item.monthlyCost}/chip</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
