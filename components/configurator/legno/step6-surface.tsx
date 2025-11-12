"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { getImageUrl, getFallbackImageUrl } from "@/lib/utils/image-utils"
import { getTableName } from "@/lib/supabase/tables"
import type { ConfigurationData } from "@/types/configuration"

interface Step6Props {
  configuration: Partial<ConfigurationData>
  updateConfiguration: (data: Partial<ConfigurationData>) => void
}

interface Surface {
  id: string
  name: string
  description: string
  price_per_sqm: number
  image?: string
}

export function Step6Surface({ configuration, updateConfiguration }: Step6Props) {
  const [surfaces, setSurfaces] = useState<Surface[]>([])
  const [selectedSurface, setSelectedSurface] = useState(configuration.surfaceId || "")
  const [loading, setLoading] = useState(true)

  const surfaceArea =
    configuration.width && configuration.depth ? (configuration.width * configuration.depth) / 10000 : 0

  useEffect(() => {
    const fetchSurfaces = async () => {
      const supabase = createClient()
      const tableName = getTableName('legno', 'surfaces')
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq('is_active', true)
        .order("display_order")

      if (error) {
        console.error("[Legno] Error fetching surfaces:", error)
      } else {
        console.log("[Legno] Loaded surfaces:", data)
        setSurfaces(data || [])
      }
      setLoading(false)
    }

    fetchSurfaces()
  }, [])

  useEffect(() => {
    if (selectedSurface) {
      updateConfiguration({ surfaceId: selectedSurface })
    }
  }, [selectedSurface])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (surfaces.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nessuna superficie disponibile al momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-800 text-lg">Scegli il tipo di superficie per la tua struttura in legno</p>
        {surfaceArea > 0 && (
          <p className="text-green-700 font-semibold mt-2 text-xl">
            Superficie da coprire: {surfaceArea.toFixed(1)} m²
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surfaces.map((surface) => {
          const imageUrl = getImageUrl(surface.image)
          const totalPrice = surface.price_per_sqm * surfaceArea

          return (
            <Card
              key={surface.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedSurface === surface.id 
                  ? "ring-2 ring-green-600 bg-green-50 shadow-xl" 
                  : "hover:bg-green-50 hover:border-green-300"
              }`}
              onClick={() => setSelectedSurface(surface.id)}
            >
              <CardContent className="p-6">
                {surface.image && (
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={surface.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const fallbackUrl = getFallbackImageUrl("surface")
                      console.log("[Legno] Image failed for surface:", surface.name, "Using fallback:", fallbackUrl)
                      target.src = fallbackUrl
                    }}
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{surface.name}</h3>
                <p className="text-gray-700 mb-3 text-sm">{surface.description}</p>
                
                {surfaceArea > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">€{surface.price_per_sqm}/m²</span>
                      <span className="text-lg font-bold text-green-700">
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
