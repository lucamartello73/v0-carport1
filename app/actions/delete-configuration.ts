"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteConfiguration(configurationId: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("carport_configurations").delete().eq("id", configurationId)

    if (error) {
      console.error("Error deleting configuration:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/configurations")
    revalidatePath("/admin/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error in deleteConfiguration:", error)
    return { success: false, error: "Errore durante l'eliminazione della configurazione" }
  }
}
