"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ConfigurationData } from "@/app/configuratore/page"

interface Step3Props {
  configuration: Partial<ConfigurationData>
  updateConfiguration: (data: Partial<ConfigurationData>) => void
}

const carSpotsData = [
  { spots: 1, width: 230, depth: 400, height: 200, label: "1 Posto Auto" },
  { spots: 2, width: 460, depth: 400, height: 200, label: "2 Posti Auto" },
  { spots: 3, width: 690, depth: 400, height: 200, label: "3 Posti Auto" },
  { spots: 4, width: 920, depth: 400, height: 200, label: "4 Posti Auto" },
  { spots: 5, width: 1150, depth: 400, height: 200, label: "5+ Posti Auto" },
]

export function Step3Dimensions({ configuration, updateConfiguration }: Step3Props) {
  const [carSpots, setCarSpots] = useState(configuration.carSpots || 1)
  const [width, setWidth] = useState(configuration.width || 230)
  const [depth, setDepth] = useState(configuration.depth || 400)
  const [height, setHeight] = useState(configuration.height || 200)

  const handleCarSpotsChange = (spots: number) => {
    const selectedData = carSpotsData.find((data) => data.spots === spots)
    if (selectedData) {
      setCarSpots(spots)
      setWidth(selectedData.width)
      setDepth(selectedData.depth)
      setHeight(selectedData.height)
    }
  }

  useEffect(() => {
    updateConfiguration({ carSpots, width, depth, height })
  }, [carSpots, width, depth, height, updateConfiguration])

  return (
    <div className="space-y-8">
      <p className="text-gray-800 text-center text-lg">
        Seleziona il numero di posti auto e personalizza le dimensioni
      </p>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 text-center">Quanti posti auto?</h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {carSpotsData.map((data) => (
            <Button
              key={data.spots}
              variant={carSpots === data.spots ? "default" : "outline"}
              onClick={() => handleCarSpotsChange(data.spots)}
              className={`h-auto p-4 flex flex-col items-center gap-2 ${
                carSpots === data.spots
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-green-300 text-green-700 hover:bg-green-50"
              }`}
            >
              <span className="text-2xl font-bold">
                {data.spots}
                {data.spots === 5 ? "+" : ""}
              </span>
              <span className="text-sm text-center">{data.label}</span>
            </Button>
          ))}
        </div>

        <Card className="p-6 bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">
            Dimensioni suggerite per {carSpots} posto{carSpots > 1 ? "i" : ""} auto:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-gray-700">Larghezza frontale</div>
              <div className="text-lg font-bold text-green-700">
                {carSpotsData.find((d) => d.spots === carSpots)?.width} cm
              </div>
              <div className="text-xs text-gray-600">dove entra l'auto</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-700">Profondità minima</div>
              <div className="text-lg font-bold text-green-700">
                {carSpotsData.find((d) => d.spots === carSpots)?.depth} cm
              </div>
              <div className="text-xs text-gray-600">lunghezza auto</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-700">Altezza suggerita</div>
              <div className="text-lg font-bold text-green-700">
                {carSpotsData.find((d) => d.spots === carSpots)?.height} cm
              </div>
              <div className="text-xs text-gray-600">clearance minima</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <Label className="text-gray-900 font-semibold mb-4 block">Larghezza: {width} cm</Label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min={200}
              max={1500}
              className="w-full"
            />
          </Card>

          <Card className="p-6">
            <Label className="text-gray-900 font-semibold mb-4 block">Profondità: {depth} cm</Label>
            <Input
              type="number"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              min={300}
              max={1000}
              className="w-full"
            />
          </Card>

          <Card className="p-6">
            <Label className="text-gray-900 font-semibold mb-4 block">Altezza: {height} cm</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={180}
              max={350}
              className="w-full"
            />
          </Card>
        </div>

        {/* Preview */}
        <div className="flex items-center justify-center">
          <Card className="p-6 bg-green-50">
            <h3 className="text-gray-900 font-semibold mb-4 text-center">Riepilogo Dimensioni</h3>
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-2">
                  {carSpots} Posto{carSpots > 1 ? "i" : ""} Auto
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {width} × {depth} × {height} cm
                </div>
                <div className="text-gray-700 mt-2">Superficie: {((width * depth) / 10000).toFixed(1)} m²</div>
              </div>
              <div className="text-xs text-gray-600 bg-white p-3 rounded">
                <strong>Nota:</strong> Le dimensioni possono essere personalizzate in base alle tue esigenze specifiche
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
