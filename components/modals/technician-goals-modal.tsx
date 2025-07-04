"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Target, Calendar, TrendingUp } from "lucide-react"

interface TechnicianGoalsModalProps {
  technician?: {
    id: number
    name: string
    currentGoals?: {
      monthly: number
      weekly: number
      efficiency: number
    }
  }
}

export function TechnicianGoalsModal({ technician }: TechnicianGoalsModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    monthlyGoal: technician?.currentGoals?.monthly?.toString() || "",
    weeklyGoal: technician?.currentGoals?.weekly?.toString() || "",
    efficiencyGoal: technician?.currentGoals?.efficiency?.toString() || "",
    period: "monthly",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.monthlyGoal || !formData.weeklyGoal || !formData.efficiencyGoal) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    // Simular salvamento
    alert(`Metas configuradas para ${technician?.name || "técnico"}:
    - Meta Mensal: ${formData.monthlyGoal} instalações
    - Meta Semanal: ${formData.weeklyGoal} instalações  
    - Meta de Eficiência: ${formData.efficiencyGoal}%
    - Período: ${formData.period}
    - Descrição: ${formData.description || "Nenhuma"}`)

    setOpen(false)

    // Reset form
    setFormData({
      monthlyGoal: "",
      weeklyGoal: "",
      efficiencyGoal: "",
      period: "monthly",
      description: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          <Target className="w-4 h-4 mr-2" />
          Configurar Metas
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-green-400" />
            Configurar Metas {technician ? `- ${technician.name}` : ""}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyGoal" className="text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Meta Mensal *
              </Label>
              <Input
                id="monthlyGoal"
                type="number"
                placeholder="Ex: 20"
                value={formData.monthlyGoal}
                onChange={(e) => handleInputChange("monthlyGoal", e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeklyGoal" className="text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Meta Semanal *
              </Label>
              <Input
                id="weeklyGoal"
                type="number"
                placeholder="Ex: 5"
                value={formData.weeklyGoal}
                onChange={(e) => handleInputChange("weeklyGoal", e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="efficiencyGoal" className="text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Meta de Eficiência (%) *
            </Label>
            <Input
              id="efficiencyGoal"
              type="number"
              min="0"
              max="100"
              placeholder="Ex: 85"
              value={formData.efficiencyGoal}
              onChange={(e) => handleInputChange("efficiencyGoal", e.target.value)}
              className="bg-slate-900 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="period" className="text-slate-300">
              Período de Avaliação
            </Label>
            <Select value={formData.period} onValueChange={(value) => handleInputChange("period", value)}>
              <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="quarterly">Trimestral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Observações
            </Label>
            <Textarea
              id="description"
              placeholder="Observações adicionais sobre as metas..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-slate-900 border-slate-600 text-white resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 btn-primary">
              Salvar Metas
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
