"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export function NewTechnicianModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    reference: "",
    phone: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Novo técnico:", formData)
    setOpen(false)
    setFormData({
      name: "",
      region: "",
      reference: "",
      phone: "",
      email: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Técnico
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Técnico</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-900 border-slate-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="region">Região</Label>
            <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue placeholder="Selecione a região" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="São Paulo - SP">São Paulo - SP</SelectItem>
                <SelectItem value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</SelectItem>
                <SelectItem value="Belo Horizonte - MG">Belo Horizonte - MG</SelectItem>
                <SelectItem value="Salvador - BA">Salvador - BA</SelectItem>
                <SelectItem value="Brasília - DF">Brasília - DF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reference">Referência</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="Ex: TEC006"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-900 border-slate-600"
              placeholder="tecnico@email.com"
              required
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
