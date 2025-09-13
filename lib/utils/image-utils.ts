/**
 * Utility functions for handling image URLs in the carport configurator
 */

/**
 * Converts a database image path to a proper URL
 * Handles both local paths (/image.jpg) and Supabase Storage URLs
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return "/placeholder.svg?height=200&width=300"
  }

  // If it's already a full URL (Supabase Storage), return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  // If it's a local path starting with /, check if it exists in public folder
  // For now, we'll use placeholder images for local paths since they don't exist
  if (imagePath.startsWith("/")) {
    // Map common local paths to appropriate placeholders
    if (imagePath.includes("addossato")) {
      return "/placeholder.svg?height=200&width=300"
    } else if (imagePath.includes("autoportante")) {
      return "/placeholder.svg?height=200&width=300"
    } else if (imagePath.includes("doppio")) {
      return "/placeholder.svg?height=200&width=300"
    } else if (imagePath.includes("model")) {
      return "/placeholder.svg?height=200&width=300"
    } else if (imagePath.includes("surface")) {
      return "/placeholder.svg?height=200&width=300"
    } else if (imagePath.includes("coverage")) {
      return "/placeholder.svg?height=200&width=300"
    }

    // Generic carport placeholder for other local paths
    return "/placeholder.svg?height=200&width=300"
  }

  // If it's a relative path, treat as local
  return "/placeholder.svg?height=200&width=300"
}

/**
 * Gets a fallback image URL for when the main image fails to load
 */
export function getFallbackImageUrl(type: "structure" | "model" | "surface" | "coverage" = "structure"): string {
  const queries = {
    structure: "carport structure",
    model: "carport model",
    surface: "carport surface material",
    coverage: "carport coverage roof",
  }

  return `/placeholder.svg?height=200&width=300&query=${queries[type]}`
}
