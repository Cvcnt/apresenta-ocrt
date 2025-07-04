"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export function NewChipModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    operator: "",
    iccid: "",
    number: "",
    plan: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Novo chip:", formData)
    setOpen(false)
    setFormData({
      operator: "",
      iccid: "",
      number: "",
      plan: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Novo Chip
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Chip</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="operator">Operadora</Label>
            <Select value={formData.operator} onValueChange={(value) => setFormData({ ...formData, operator: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue placeholder="Selecione a operadora" />
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
            <Label htmlFor="iccid">ICCID</Label>
            <Input
              id="iccid"
              value={formData.iccid}
              onChange={(e) => setFormData({ ...formData, iccid: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="8955071234567890123"
              required
            />
          </div>

          <div>
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="11987654321"
              required
            />
          </div>

          <div>
            <Label htmlFor="plan">Plano</Label>
            <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue placeholder="Selecione o plano" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="Dados 1GB">Dados 1GB</SelectItem>
                <SelectItem value="Dados 2GB">Dados 2GB</SelectItem>
                <SelectItem value="Dados 3GB">Dados 3GB</SelectItem>
                <SelectItem value="Dados 5GB">Dados 5GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
