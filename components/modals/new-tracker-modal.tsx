"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function NewTrackerModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    serial: "",
    model: "",
    operator: "",
    iccid: "",
    chipNumber: "",
    location: "",
    client: "",
    observations: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Novo rastreador:", formData)
    // Aqui você adicionaria a lógica para salvar o rastreador
    setOpen(false)
    setFormData({
      serial: "",
      model: "",
      operator: "",
      iccid: "",
      chipNumber: "",
      location: "",
      client: "",
      observations: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Rastreador
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Rastreador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serial">Serial</Label>
              <Input
                id="serial"
                value={formData.serial}
                onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                className="bg-slate-900 border-slate-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="bg-slate-900 border-slate-600"
                required
              />
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="iccid">ICCID</Label>
              <Input
                id="iccid"
                value={formData.iccid}
                onChange={(e) => setFormData({ ...formData, iccid: e.target.value })}
                className="bg-slate-900 border-slate-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="chipNumber">Número do Chip</Label>
              <Input
                id="chipNumber"
                value={formData.chipNumber}
                onChange={(e) => setFormData({ ...formData, chipNumber: e.target.value })}
                className="bg-slate-900 border-slate-600"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="Ex: São Paulo - SP"
              required
            />
          </div>

          <div>
            <Label htmlFor="client">Cliente</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="Observações adicionais..."
            />
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
