"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { createClient } from "@/lib/supabase/client"
import { getImageUrl, getFallbackImageUrl } from "@/lib/utils/image-utils"
import { getTableName } from "@/lib/supabase/tables"
import type { ConfigurationData } from "@/types/configuration"

interface Step1Props {
  configuration: Partial<ConfigurationData>
  updateConfiguration: (data: Partial<ConfigurationData>) => void
}

interface PergolaType {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  is_active: boolean
  base_price?: number
}

export function Step1PergolaType({ configuration, updateConfiguration }: Step1Props) {
  const [pergolaTypes, setPergolaTypes] = useState<PergolaType[]>([])
  const [selectedType, setSelectedType] = useState(configuration.modelId || "")
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const loadPergolaTypes = async () => {
      try {
        const supabase = createClient()
        const tableName = getTableName('legno', 'pergola_types')

        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .eq("is_active", true)
          .order("name")

        if (error) {
          console.error("Error loading pergola types:", error)
          return
        }

        console.log("[Legno] Loaded pergola types from database:", data)
        setPergolaTypes(data || [])
      } catch (error) {
        console.error("Error loading pergola types:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPergolaTypes()
  }, [])

  useEffect(() => {
    if (selectedType) {
      setIsUpdating(true)
      setTimeout(() => {
        const selectedPergola = pergolaTypes.find((type) => type.id === selectedType)
        updateConfiguration({
          modelId: selectedType,
          structureType: selectedPergola?.name || selectedType,
        })
        setIsUpdating(false)
      }, 300)
    }
  }, [selectedType, pergolaTypes, updateConfiguration])

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-gray-800 text-lg">Seleziona il tipo di pergola in legno</p>
        <p className="text-gray-600 text-sm mt-2">Scegli tra le diverse soluzioni naturali disponibili</p>
      </div>

      {isUpdating && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pergolaTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
              selectedType === type.id
                ? "ring-2 ring-green-600 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
                : "hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50"
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <CardContent className="p-6">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={getImageUrl(type.image) || "/placeholder.svg"}
                  alt={type.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = getFallbackImageUrl("pergola")
                  }}
                />
                {selectedType === type.id && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{type.name}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{type.description}</p>

              {type.features && type.features.length > 0 && (
                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-800">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {type.base_price && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Prezzo base da:</p>
                  <p className="text-xl font-bold text-green-700">€{type.base_price.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {pergolaTypes.length === 0 && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          <p>Nessun tipo di pergola disponibile al momento.</p>
        </div>
      )}
    </div>
  )
}
