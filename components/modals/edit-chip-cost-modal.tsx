"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditChipCostModalProps {
  chip: any
  onClose: () => void
}

export function EditChipCostModal({ chip, onClose }: EditChipCostModalProps) {
  const [formData, setFormData] = useState({
    operator: "",
    plan: "",
    monthlyCost: "",
    quantity: "",
    contractDate: "",
    status: "Ativo",
  })

  useEffect(() => {
    if (chip) {
      setFormData({
        operator: chip.operator,
        plan: chip.plan,
        monthlyCost: chip.monthlyCost.toString(),
        quantity: chip.quantity.toString(),
        contractDate: chip.contractDate,
        status: chip.status,
      })
    }
  }, [chip])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Editando custo de chip:", formData)
    alert("Custo de chip atualizado com sucesso!")
    onClose()
  }

  return (
    <Dialog open={!!chip} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Custo de Chip</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="operator">Operadora</Label>
            <Select value={formData.operator} onValueChange={(value) => setFormData({ ...formData, operator: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="Vivo">Vivo</SelectItem>
                <SelectItem value="Claro">Claro</SelectItem>
                <SelectItem value="Tim">Tim</SelectItem>
                <SelectItem value="Oi">Oi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="plan">Plano</Label>
            <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="Dados 1GB">Dados 1GB</SelectItem>
                <SelectItem value="Dados 2GB">Dados 2GB</SelectItem>
                <SelectItem value="Dados 3GB">Dados 3GB</SelectItem>
                <SelectItem value="Dados 5GB">Dados 5GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthlyCost">Custo Mensal (R$)</Label>
              <Input
                id="monthlyCost"
                type="number"
                value={formData.monthlyCost}
                onChange={(e) => setFormData({ ...formData, monthlyCost: e.target.value })}
                className="bg-slate-900 border-slate-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="bg-slate-900 border-slate-600"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contractDate">Data do Contrato</Label>
            <Input
              id="contractDate"
              type="date"
              value={formData.contractDate}
              onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
              className="bg-slate-900 border-slate-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary flex-1">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
