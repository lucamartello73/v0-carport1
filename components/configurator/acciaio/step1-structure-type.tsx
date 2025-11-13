"use client"

import { useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fetchConfiguratorData, getImageUrlOrPlaceholder } from "@/lib/supabase/fetchConfiguratorData"
import { getFallbackImageUrl } from "@/lib/utils/image-utils"
import { ImageOff } from "lucide-react"
import type { ConfigurationData } from "@/types/configuration"

interface Step1Props {
  configuration: Partial<ConfigurationData>
  updateConfiguration: (data: Partial<ConfigurationData>) => void
}

interface StructureType {
  id: string
  name: string
  description: string
  image: string
  structure_category: string
  features: string[]
  is_active: boolean
  model_id?: string
}

export function Step1StructureType({ configuration, updateConfiguration }: Step1Props) {
  const [structureTypes, setStructureTypes] = useState<StructureType[]>([])
  const [selectedType, setSelectedType] = useState(configuration.structureType || "")
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const loadStructureTypes = async () => {
      try {
        const { data, error } = await fetchConfiguratorData<StructureType>({
          material: 'acciaio',
          table: 'structure_types'
        })

        if (error) {
          console.error("[Acciaio] Error loading structure types:", error)
          return
        }

        console.log("[Acciaio] Loaded structure types:", data)
        setStructureTypes(data || [])
      } catch (error) {
        console.error("[Acciaio] Error loading structure types:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStructureTypes()
  }, [])

  useEffect(() => {
    if (selectedType) {
      setIsUpdating(true)
      setTimeout(() => {
        const selectedStructure = structureTypes.find((type) => type.id === selectedType)
        updateConfiguration({
          structureTypeId: selectedType,
          structureType: selectedStructure?.name || selectedType,
        })
        setIsUpdating(false)
      }, 300)
    }
  }, [selectedType, structureTypes, updateConfiguration])

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
        <h2 className="text-2xl font-bold text-primary mb-2">Seleziona il tipo di struttura in acciaio</h2>
        <p className="text-secondary">Scegli tra le diverse soluzioni metalliche disponibili</p>
      </div>

      {isUpdating && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      <div className="product-grid">
        {structureTypes.map((type) => {
          const imageUrl = getImageUrlOrPlaceholder(type.image, 'structure') || getFallbackImageUrl("structure")
          
          return (
            <div
              key={type.id}
              className={`product-card ${selectedType === type.id ? 'product-card-selected' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="product-image-container">
                <img
                  src={imageUrl}
                  alt={type.name}
                  className="product-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = getFallbackImageUrl("structure")
                  }}
                />
                {selectedType === type.id && (
                  <div className="badge-selected">
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

              <div className="product-content">
                <h3 className="product-title">{type.name}</h3>
                <p className="product-description">{type.description}</p>

                {type.features && type.features.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-primary">
                        <svg className="w-4 h-4 text-accent-pink mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
              </div>
            </div>
          )
        })}
      </div>

      {structureTypes.length === 0 && !isLoading && (
        <div className="text-center py-12 text-secondary">
          <p>Nessun tipo di struttura disponibile al momento.</p>
        </div>
      )}
    </div>
  )
}
