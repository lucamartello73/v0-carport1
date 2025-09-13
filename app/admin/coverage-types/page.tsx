"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminLayout } from "@/components/admin/admin-layout"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"

interface CoverageType {
  id: string
  name: string
  description: string
  image: string
  price_modifier: number
  created_at: string
  updated_at: string
}

export default function CoverageTypesPage() {
  const [coverageTypes, setCoverageTypes] = useState<CoverageType[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price_modifier: 0,
  })

  useEffect(() => {
    fetchCoverageTypes()
  }, [])

  const fetchCoverageTypes = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("carport_coverage_types")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching coverage types:", error)
    } else {
      setCoverageTypes(data || [])
    }
    setLoading(false)
  }

  const handleSave = async () => {
    const supabase = createClient()
    const dataToSave = {
      ...formData,
      price_modifier: Number(formData.price_modifier),
    }

    let error
    if (editingId) {
      const { error: updateError } = await supabase
        .from("carport_coverage_types")
        .update(dataToSave)
        .eq("id", editingId)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("carport_coverage_types").insert([dataToSave])
      error = insertError
    }

    if (error) {
      console.error("Error saving coverage type:", error)
    } else {
      await fetchCoverageTypes()
      resetForm()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo tipo di copertura?")) return

    const supabase = createClient()
    const { error } = await supabase.from("carport_coverage_types").delete().eq("id", id)

    if (error) {
      console.error("Error deleting coverage type:", error)
    } else {
      await fetchCoverageTypes()
    }
  }

  const startEdit = (coverageType: CoverageType) => {
    setEditingId(coverageType.id)
    setFormData({
      name: coverageType.name,
      description: coverageType.description,
      image: coverageType.image,
      price_modifier: coverageType.price_modifier,
    })
    setIsCreating(false)
  }

  const resetForm = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({
      name: "",
      description: "",
      image: "",
      price_modifier: 0,
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8 text-green-600">Caricamento tipi di copertura...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Gestione Tipi di Copertura</h1>
          <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nuovo Tipo
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">
                {editingId ? "Modifica Tipo di Copertura" : "Nuovo Tipo di Copertura"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="es. Tegole Canadesi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Modificatore Prezzo (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price_modifier}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price_modifier: Number.parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="es. 15.5"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  currentImage={formData.image}
                  onImageUploaded={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                  folder="coverage-types"
                  label="Immagine Tipo Copertura"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrizione del tipo di copertura..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Salva
                </Button>
                <Button onClick={resetForm} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Annulla
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Coverage Types List */}
        <div className="grid gap-6">
          {coverageTypes.map((coverageType) => (
            <Card key={coverageType.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-green-800">{coverageType.name}</h3>
                      <span className="text-sm text-gray-600">
                        Modificatore prezzo: {coverageType.price_modifier > 0 ? "+" : ""}
                        {coverageType.price_modifier}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700">{coverageType.description}</p>
                      </div>

                      {coverageType.image && (
                        <div>
                          <img
                            src={coverageType.image || "/placeholder.svg"}
                            alt={coverageType.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button onClick={() => startEdit(coverageType)} variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(coverageType.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
