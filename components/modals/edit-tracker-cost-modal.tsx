"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditTrackerCostModalProps {
  tracker: any
  onClose: () => void
}

export function EditTrackerCostModal({ tracker, onClose }: EditTrackerCostModalProps) {
  const [formData, setFormData] = useState({
    model: "",
    unitCost: "",
    quantity: "",
    supplier: "",
    purchaseDate: "",
    status: "Ativo",
  })

  useEffect(() => {
    if (tracker) {
      setFormData({
        model: tracker.model,
        unitCost: tracker.unitCost.toString(),
        quantity: tracker.quantity.toString(),
        supplier: tracker.supplier,
        purchaseDate: tracker.purchaseDate,
        status: tracker.status,
      })
    }
  }, [tracker])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Editando custo de rastreador:", formData)
    alert("Custo de rastreador atualizado com sucesso!")
    onClose()
  }

  return (
    <Dialog open={!!tracker} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Custo de Rastreador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="model">Modelo do Rastreador</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="bg-slate-900 border-slate-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unitCost">Custo Unitário (R$)</Label>
              <Input
                id="unitCost"
                type="number"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
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
            <Label htmlFor="supplier">Fornecedor</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="bg-slate-900 border-slate-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="purchaseDate">Data da Compra</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
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
