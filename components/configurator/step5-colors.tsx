"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ConfigurationData } from "@/app/configuratore/page"

interface Step5Props {
  configuration: Partial<ConfigurationData>
  updateConfiguration: (data: Partial<ConfigurationData>) => void
}

const colorOptions = {
  ral: [
    { id: "ral-9005", name: "Nero Intenso", hex: "#0A0A0A" },
    { id: "ral-7016", name: "Grigio Antracite", hex: "#383E42" },
    { id: "ral-9006", name: "Alluminio Bianco", hex: "#A5A5A5" },
    { id: "ral-6005", name: "Verde Muschio", hex: "#2F4F2F" },
    { id: "ral-3009", name: "Rosso Ossido", hex: "#642424" },
  ],
  smalto: [
    { id: "smalto-bianco", name: "Bianco Opaco", hex: "#F8F8FF" },
    { id: "smalto-nero", name: "Nero Opaco", hex: "#2F2F2F" },
    { id: "smalto-grigio", name: "Grigio Perla", hex: "#C0C0C0" },
    { id: "smalto-verde", name: "Verde Salvia", hex: "#87A96B" },
    { id: "smalto-blu", name: "Blu Petrolio", hex: "#4682B4" },
  ],
  impregnante_classico: [
    { id: "imp-noce", name: "Noce", hex: "#8B4513" },
    { id: "imp-mogano", name: "Mogano", hex: "#C04000" },
    { id: "imp-frassino", name: "Frassino", hex: "#D2B48C" },
    { id: "imp-teak", name: "Teak", hex: "#B8860B" },
    { id: "imp-rovere", name: "Rovere", hex: "#DEB887" },
  ],
  impregnante_pastello: [
    { id: "past-azzurro", name: "Azzurro Pastello", hex: "#B0E0E6" },
    { id: "past-rosa", name: "Rosa Pastello", hex: "#FFB6C1" },
    { id: "past-verde", name: "Verde Pastello", hex: "#98FB98" },
    { id: "past-giallo", name: "Giallo Pastello", hex: "#FFFFE0" },
    { id: "past-lilla", name: "Lilla Pastello", hex: "#DDA0DD" },
  ],
}

export function Step5Colors({ configuration, updateConfiguration }: Step5Props) {
  const [selectedStructureColor, setSelectedStructureColor] = useState(configuration.structureColor || "")
  const [customColor, setCustomColor] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const getColorCategory = () => {
    const material = configuration.material
    if (material === "acciaio") return "ral"
    if (material === "legno") {
      // For now, default to smalto for wood, but this could be expanded
      return "smalto"
    }
    return "ral" // default fallback
  }

  const colorCategory = getColorCategory()
  const availableColors = colorOptions[colorCategory] || colorOptions.ral

  useEffect(() => {
    updateConfiguration({
      structureColor: selectedStructureColor || undefined,
    })
  }, [selectedStructureColor, updateConfiguration])

  const getCategoryTitle = () => {
    switch (colorCategory) {
      case "ral":
        return "Colori RAL per Acciaio"
      case "smalto":
        return "Smalto Coprente per Legno"
      case "impregnante_classico":
        return "Impregnanti Legno Classici"
      case "impregnante_pastello":
        return "Impregnanti Colore Pastello"
      default:
        return "Colori Struttura"
    }
  }

  const handleCustomColorSubmit = () => {
    if (customColor.trim()) {
      setSelectedStructureColor(`custom-${customColor}`)
      setShowCustomInput(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-gray-800 text-lg">Seleziona il colore per la struttura</p>
        <p className="text-gray-600 text-sm mt-2">
          {configuration.material === "acciaio"
            ? "Colori RAL per struttura in acciaio"
            : "Colori per struttura in legno"}
        </p>
      </div>

      {/* Structure Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">{getCategoryTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {availableColors.map((color) => (
              <div
                key={color.id}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  selectedStructureColor === color.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setSelectedStructureColor(color.id)}
              >
                <div className="w-full h-16 rounded-lg mb-2 border" style={{ backgroundColor: color.hex }} />
                <p className="text-sm font-medium text-gray-900 text-center">{color.name}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Colore Personalizzato</h4>
            {!showCustomInput ? (
              <Button
                variant="outline"
                onClick={() => setShowCustomInput(true)}
                className="border-dashed border-2 border-gray-300 hover:border-green-400 text-gray-600 hover:text-green-700"
              >
                + Aggiungi colore personalizzato
              </Button>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Inserisci il nome del colore personalizzato"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleCustomColorSubmit} className="bg-green-600 hover:bg-green-700">
                  Aggiungi
                </Button>
                <Button variant="outline" onClick={() => setShowCustomInput(false)}>
                  Annulla
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
