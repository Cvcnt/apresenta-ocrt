"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, Type, Square, Circle, Zap, Download, Copy, Check, AlertTriangle, Info, X } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { useState } from "react"

const colorPalette = {
  primary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
}

const components = [
  { name: "Button Primary", component: <Button className="btn-primary">Botão Primário</Button> },
  { name: "Button Secondary", component: <Button className="btn-secondary">Botão Secundário</Button> },
  { name: "Button Outline", component: <Button className="btn-outline">Botão Outline</Button> },
  { name: "Badge Active", component: <Badge className="status-active">Ativo</Badge> },
  { name: "Badge Repair", component: <Badge className="status-repair">Reparo</Badge> },
  { name: "Badge Stock", component: <Badge className="status-stock">Estoque</Badge> },
  { name: "Badge Complete", component: <Badge className="status-complete">Completo</Badge> },
  { name: "Badge Inactive", component: <Badge className="status-inactive">Inativo</Badge> },
]

export default function DesignSystem() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <>
      <AppSidebar />
      <Header />
      <div className="ml-16 pt-16 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Design System</h1>
            <p className="text-slate-400">Padronização visual e componentes do CarTracking</p>
          </div>

          {/* Paleta de Cores */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Paleta de Cores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cores Primárias */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Verde (Primary)</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {Object.entries(colorPalette.primary).map(([shade, color]) => (
                    <div key={shade} className="text-center">
                      <div
                        className="w-16 h-16 rounded-lg cursor-pointer hover:scale-105 transition-transform border border-slate-600"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                        title={`Clique para copiar ${color}`}
                      />
                      <p className="text-xs text-slate-400 mt-1">{shade}</p>
                      <p className="text-xs text-slate-500 font-mono">{color}</p>
                      {copiedColor === color && (
                        <div className="flex items-center justify-center mt-1">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cores Neutras */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Slate (Neutral)</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {Object.entries(colorPalette.slate).map(([shade, color]) => (
                    <div key={shade} className="text-center">
                      <div
                        className="w-16 h-16 rounded-lg cursor-pointer hover:scale-105 transition-transform border border-slate-600"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                        title={`Clique para copiar ${color}`}
                      />
                      <p className="text-xs text-slate-400 mt-1">{shade}</p>
                      <p className="text-xs text-slate-500 font-mono">{color}</p>
                      {copiedColor === color && (
                        <div className="flex items-center justify-center mt-1">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cores de Status */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Cores de Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-green-500 rounded-lg mx-auto cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyToClipboard("#10b981")}
                    />
                    <p className="text-sm text-white mt-2">Sucesso</p>
                    <p className="text-xs text-slate-400">#10b981</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-yellow-500 rounded-lg mx-auto cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyToClipboard("#f59e0b")}
                    />
                    <p className="text-sm text-white mt-2">Aviso</p>
                    <p className="text-xs text-slate-400">#f59e0b</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-red-500 rounded-lg mx-auto cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyToClipboard("#ef4444")}
                    />
                    <p className="text-sm text-white mt-2">Erro</p>
                    <p className="text-xs text-slate-400">#ef4444</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-blue-500 rounded-lg mx-auto cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyToClipboard("#3b82f6")}
                    />
                    <p className="text-sm text-white mt-2">Info</p>
                    <p className="text-xs text-slate-400">#3b82f6</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 bg-purple-500 rounded-lg mx-auto cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyToClipboard("#8b5cf6")}
                    />
                    <p className="text-sm text-white mt-2">Destaque</p>
                    <p className="text-xs text-slate-400">#8b5cf6</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tipografia */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Type className="w-5 h-5" />
                Tipografia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-white">Heading 1 - 4xl</h1>
                  <code className="text-slate-400 text-sm">text-4xl font-bold</code>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Heading 2 - 3xl</h2>
                  <code className="text-slate-400 text-sm">text-3xl font-bold</code>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Heading 3 - 2xl</h3>
                  <code className="text-slate-400 text-sm">text-2xl font-semibold</code>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Heading 4 - xl</h4>
                  <code className="text-slate-400 text-sm">text-xl font-semibold</code>
                </div>
                <div>
                  <p className="text-base text-slate-300">Body Text - Base</p>
                  <code className="text-slate-400 text-sm">text-base text-slate-300</code>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Small Text - SM</p>
                  <code className="text-slate-400 text-sm">text-sm text-slate-400</code>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Extra Small - XS</p>
                  <code className="text-slate-400 text-sm">text-xs text-slate-500</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Componentes */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Square className="w-5 h-5" />
                Componentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((comp, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-sm font-medium text-slate-300">{comp.name}</p>
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">{comp.component}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Espaçamentos */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Circle className="w-5 h-5" />
                Espaçamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <div className={`bg-green-500 h-4`} style={{ width: `${size * 4}px` }} />
                    <span className="text-slate-300 font-mono">
                      p-{size} ({size * 4}px)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ícones */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Ícones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                {[Check, X, AlertTriangle, Info, Download, Copy, Palette, Type, Square, Circle, Zap].map(
                  (Icon, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 p-3 bg-slate-900 rounded-lg">
                      <Icon className="w-6 h-6 text-slate-300" />
                      <span className="text-xs text-slate-400">{Icon.name}</span>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Exportar Design System */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Exportar Design System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button className="btn-primary" onClick={() => alert("Exportando CSS...")}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSS
                </Button>
                <Button className="btn-secondary" onClick={() => alert("Exportando JSON...")}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar JSON
                </Button>
                <Button className="btn-outline" onClick={() => alert("Exportando Figma...")}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Figma
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
