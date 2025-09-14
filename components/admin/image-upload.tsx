"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageUploadProps {
  currentImage?: string
  onImageUploaded: (url: string | null) => void
  onImageRemoved?: () => void
  bucket?: string
  folder?: string
  label?: string
}

export function ImageUpload({
  currentImage,
  onImageUploaded,
  onImageRemoved = () => {},
  bucket = "images",
  folder = "carport",
  label = "Immagine",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage || "")
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)

    try {
      const compressedFile = await compressImage(file)

      const supabase = createClient()

      // Create unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { data, error } = await supabase.storage.from(bucket).upload(fileName, compressedFile)

      if (error) {
        console.error("Error uploading file:", error)

        // Handle different types of errors
        if (error.message && (error.message.includes("Bucket not found") || error.statusCode === "404")) {
          setUploadError(
            "Il bucket di storage non è configurato. Esegui lo script SQL per crearlo o usa l'URL manuale.",
          )
        } else if (error.message && error.message.includes("not authenticated")) {
          setUploadError("Devi essere autenticato per caricare file. Usa l'URL manuale.")
        } else {
          setUploadError(`Errore durante il caricamento: ${error.message || "Errore sconosciuto"}`)
        }
        return
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName)

      setPreviewUrl(publicUrl)
      onImageUploaded(publicUrl)
      setUploadError(null)
    } catch (error: any) {
      console.error("Error:", error)
      const errorMessage = error?.message || "Errore durante il caricamento del file"
      setUploadError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new window.Image()

      img.onload = () => {
        // Calculate new dimensions (max 1200px width/height)
        const maxSize = 1200
        let { width, height } = img

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              resolve(file) // Fallback to original file
            }
          },
          "image/jpeg",
          0.8, // 80% quality for good compression
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleRemoveImage = () => {
    setPreviewUrl("")
    onImageUploaded(null)
    onImageRemoved()
    setUploadError(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-upload">{label}</Label>
        <div className="flex gap-2 items-end">
          <Input
            id="image-url"
            placeholder="URL immagine"
            value={previewUrl}
            onChange={(e) => {
              setPreviewUrl(e.target.value)
              onImageUploaded(e.target.value)
              setUploadError(null)
            }}
            className="flex-1"
          />
          <div className="relative">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              type="button"
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 text-white"
              title={uploadError ? "Upload non disponibile - usa URL manuale" : "Carica file immagine"}
            >
              {uploading ? "Caricamento..." : "Carica File"}
            </Button>
          </div>
          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRemoveImage}
              className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
              title="Rimuovi immagine"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {uploadError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{uploadError}</p>
            {uploadError.includes("bucket") && (
              <p className="text-xs text-red-500 mt-1">
                Suggerimento: Esegui lo script SQL "create-storage-bucket.sql" per creare il bucket necessario.
              </p>
            )}
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="mt-4">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg border"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=128&width=128"
            }}
          />
        </div>
      )}
    </div>
  )
}
