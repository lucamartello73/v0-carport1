"use server"

import { createClient } from "@/lib/supabase/server"
import { getTableName, type ConfiguratorType } from "@/lib/supabase/tables"

// Interfaccia base comune
interface BaseConfigurationData {
  configurator_type: 'acciaio' | 'legno'
  width: number
  depth: number
  height: number
  package_type: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  customer_city: string
  customer_cap: string
  customer_province: string
  contact_preference: string
  total_price: number
  status: string
}

// Interfaccia specifica per ACCIAIO
interface AcciaioConfigurationData extends BaseConfigurationData {
  configurator_type: 'acciaio'
  structure_type: string
  model_id: string
  coverage_id: string
  structure_color: string // Colore struttura acciaio (nome o UUID)
  surface_id?: string
}

// Interfaccia specifica per LEGNO
interface LegnoConfigurationData extends BaseConfigurationData {
  configurator_type: 'legno'
  structure_type_id: string // UUID tipo struttura
  model_id: string
  coverage_id: string
  color_id: string // UUID colore legno
  surface_id: string // UUID superficie (obbligatorio per legno)
}

export type ConfigurationData = AcciaioConfigurationData | LegnoConfigurationData

export async function saveConfiguration(configData: ConfigurationData) {
  try {
    const configuratorType = configData.configurator_type
    console.log(`[${configuratorType}] Starting saveConfiguration with data:`, configData)
    
    const supabase = await createClient()
    const configurationsTable = getTableName(configuratorType, 'configurations')

    let dbData: any = {
      width: configData.width,
      depth: configData.depth,
      height: configData.height,
      model_id: configData.model_id,
      coverage_id: configData.coverage_id,
      surface_id: configData.surface_id || null,
      package_type: configData.package_type,
      customer_name: configData.customer_name,
      customer_email: configData.customer_email,
      customer_phone: configData.customer_phone,
      customer_address: configData.customer_address,
      customer_city: configData.customer_city,
      customer_postal_code: configData.customer_cap,
      contact_preference: configData.contact_preference,
      total_price: configData.total_price,
      status: configData.status,
    }

    // Gestione CONFIGURATORE ACCIAIO
    if (configuratorType === 'acciaio') {
      const acciaioData = configData as AcciaioConfigurationData
      
      let structure_color_id = null
      
      if (acciaioData.structure_color) {
        console.log("[acciaio] Looking up structure color:", acciaioData.structure_color)
        
        // Check if it's already a valid UUID
        if (acciaioData.structure_color.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          structure_color_id = acciaioData.structure_color
          console.log("[acciaio] Using structure color ID directly:", structure_color_id)
        } else {
          // It's a color name, look it up
          const colorsTable = getTableName('acciaio', 'colors')
          const { data: colorData, error: colorError } = await supabase
            .from(colorsTable)
            .select("id")
            .ilike("name", `%${acciaioData.structure_color}%`)
            .maybeSingle()

          if (colorError) {
            console.error("[acciaio] Structure color lookup error:", colorError)
          } else if (colorData) {
            structure_color_id = colorData.id
            console.log("[acciaio] Found existing structure color with ID:", structure_color_id)
          }
        }
      }

      dbData = {
        ...dbData,
        structure_type: acciaioData.structure_type,
        structure_color_id,
        coverage_color_id: null, // Always null since coverage color is not selected
      }
    }
    
    // Gestione CONFIGURATORE LEGNO
    else if (configuratorType === 'legno') {
      const legnoData = configData as LegnoConfigurationData
      
      console.log("[legno] Processing legno configuration with:", {
        structure_type_id: legnoData.structure_type_id,
        color_id: legnoData.color_id,
        surface_id: legnoData.surface_id,
      })

      dbData = {
        ...dbData,
        structure_type_id: legnoData.structure_type_id,
        color_id: legnoData.color_id,
        surface_id: legnoData.surface_id, // Obbligatorio per legno
      }
    }

    console.log(`[${configuratorType}] Attempting to insert into ${configurationsTable}:`, dbData)
    
    const { data, error } = await supabase
      .from(configurationsTable)
      .insert(dbData)
      .select()
      .single()

    if (error) {
      console.error(`[${configuratorType}] Database insert error:`, error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log(`[${configuratorType}] Configuration saved successfully with ID:`, data.id)
    
    // TODO: Inviare email notifica admin
    // TODO: Inviare email conferma cliente
    
    return { success: true, data }
    
  } catch (error) {
    console.error("[save-configuration] Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
