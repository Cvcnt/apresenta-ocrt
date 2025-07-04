"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, AlertCircle, CheckCircle2, User, MapPin } from "lucide-react"

interface BulkTransferModalProps {
  open: boolean
  onClose: () => void
  selectedTrackers: any[]
  onTransferComplete: () => void
}

const statusOptions = [
  { value: "Em Análise", label: "Em Análise", color: "status-stock" },
  { value: "Em Reparo", label: "Em Reparo", color: "status-repair" },
  { value: "Disponível", label: "Disponível", color: "status-active" },
  { value: "Instalado", label: "Instalado", color: "status-complete" },
  { value: "Transferido", label: "Transferido para Técnico", color: "status-complete" },
  { value: "Inativo", label: "Inativo", color: "status-inactive" },
]

const technicians = [
  { id: "TEC001", name: "João Silva", region: "São Paulo - SP" },
  { id: "TEC002", name: "Maria Santos", region: "Rio de Janeiro - RJ" },
  { id: "TEC003", name: "Carlos Lima", region: "Belo Horizonte - MG" },
  { id: "TEC004", name: "Ana Costa", region: "Salvador - BA" },
  { id: "TEC005", name: "Pedro Oliveira", region: "Brasília - DF" },
]

export function BulkTransferModal({ open, onClose, selectedTrackers, onTransferComplete }: BulkTransferModalProps) {
  const [newStatus, setNewStatus] = useState("")
  const [selectedTechnician, setSelectedTechnician] = useState("")
  const [observations, setObservations] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return "status-active"
      case "Reparo":
        return "status-repair"
      case "Estoque":
        return "status-stock"
      case "Completo":
        return "status-complete"
      default:
        return "status-inactive"
    }
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!newStatus) {
      newErrors.push("Selecione o novo status")
    }

    if ((newStatus === "Transferido" || newStatus === "Instalado") && !selectedTechnician) {
      newErrors.push("Selecione um técnico para este status")
    }

    if (!observations.trim()) {
      newErrors.push("Adicione uma observação sobre a transferência")
    }

    if (observations.trim().length < 10) {
      newErrors.push("A observação deve ter pelo menos 10 caracteres")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleTransfer = async () => {
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const selectedTechnicianData = technicians.find((t) => t.id === selectedTechnician)

      // Simular atualização dos dados dos técnicos
      if (selectedTechnicianData) {
        console.log(`Atualizando técnico ${selectedTechnicianData.name}:`)
        console.log(`Rastreadores recebidos: ${selectedTrackers.map((t) => t.serial).join(", ")}`)
      }

      // Simular registro no histórico para cada rastreador
      selectedTrackers.forEach((tracker) => {
        console.log(`Histórico - Rastreador ${tracker.serial}:`, {
          previousStatus: tracker.status,
          newStatus,
          previousAssigned: tracker.assigned,
          newAssigned: selectedTechnicianData?.name || "-",
          observations,
          user: "Admin User",
          timestamp: new Date().toISOString(),
        })
      })

      alert(
        `${selectedTrackers.length} rastreador(es) transferido(s) com sucesso!\n${selectedTechnicianData ? `Atribuído(s) para: ${selectedTechnicianData.name}` : ""}`,
      )

      onTransferComplete()
    } catch (error) {
      alert("Erro ao processar transferência. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    if (!isProcessing) {
      setNewStatus("")
      setSelectedTechnician("")
      setObservations("")
      setErrors([])
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Upload className="w-6 h-6" />
            Transferência em Massa - {selectedTrackers.length} Rastreador(es)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Lista de Rastreadores Selecionados */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-white text-lg">Rastreadores Selecionados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                {selectedTrackers.map((tracker) => (
                  <div key={tracker.id} className="bg-slate-700 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{tracker.serial}</span>
                      <Badge className={getStatusBadge(tracker.status)}>{tracker.status}</Badge>
                    </div>
                    <div className="text-sm text-slate-300 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{tracker.assigned || "Não atribuído"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{tracker.location}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {tracker.operator} • {tracker.chipNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Transferência */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-white text-lg">Configuração da Transferência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Erros */}
              {errors.length > 0 && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Corrija os seguintes erros:</span>
                  </div>
                  <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Novo Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Novo Status <span className="text-red-400">*</span>
                  </label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                      <SelectValue placeholder="Selecione o novo status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                status.color === "status-active"
                                  ? "bg-green-500"
                                  : status.color === "status-repair"
                                    ? "bg-yellow-500"
                                    : status.color === "status-stock"
                                      ? "bg-blue-500"
                                      : status.color === "status-complete"
                                        ? "bg-purple-500"
                                        : "bg-gray-500"
                              }`}
                            />
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Técnico */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Técnico Responsável
                    {(newStatus === "Transferido" || newStatus === "Instalado") && (
                      <span className="text-red-400"> *</span>
                    )}
                  </label>
                  <Select
                    value={selectedTechnician}
                    onValueChange={setSelectedTechnician}
                    disabled={!newStatus || (newStatus !== "Transferido" && newStatus !== "Instalado")}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-300">
                      <SelectValue placeholder="Selecione um técnico" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {technicians.map((technician) => (
                        <SelectItem key={technician.id} value={technician.id}>
                          <div className="space-y-1">
                            <div className="font-medium">{technician.name}</div>
                            <div className="text-xs text-slate-400">{technician.region}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Observações <span className="text-red-400">*</span>
                </label>
                <Textarea
                  placeholder="Descreva o motivo da transferência, condições dos equipamentos, instruções especiais, etc."
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-slate-300 min-h-[100px]"
                />
                <div className="text-xs text-slate-400">{observations.length}/500 caracteres (mínimo 10)</div>
              </div>

              {/* Preview da Transferência */}
              {newStatus && (
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Preview da Transferência</span>
                  </div>
                  <div className="text-sm text-slate-300 space-y-2">
                    <div>
                      <span className="text-slate-400">Rastreadores:</span> {selectedTrackers.length} unidade(s)
                    </div>
                    <div>
                      <span className="text-slate-400">Novo Status:</span> {newStatus}
                    </div>
                    {selectedTechnician && (
                      <div>
                        <span className="text-slate-400">Técnico:</span>{" "}
                        {technicians.find((t) => t.id === selectedTechnician)?.name}
                      </div>
                    )}
                    {observations && (
                      <div>
                        <span className="text-slate-400">Observação:</span> {observations.substring(0, 100)}
                        {observations.length > 100 ? "..." : ""}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing}
              className="border-slate-600 text-slate-300 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={isProcessing || !newStatus || !observations.trim()}
              className="btn-primary"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Confirmar Transferência
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
