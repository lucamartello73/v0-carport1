export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  // Simple fetch-based client for server operations
  return {
    from: (table: string) => ({
      select: (columns = "*") => ({
        ilike: (column: string, pattern: string) => ({
          maybeSingle: () => ({
            then: async (resolve: (result: { data: any | null; error: any }) => void) => {
              try {
                const encodedPattern = encodeURIComponent(pattern)
                const response = await fetch(
                  `${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}=ilike.${encodedPattern}`,
                  {
                    headers: {
                      apikey: supabaseKey,
                      Authorization: `Bearer ${supabaseKey}`,
                      "Content-Type": "application/json",
                    },
                  },
                )
                const data = await response.json()
                // maybeSingle returns the first item or null if no items found
                resolve({ data: data && data.length > 0 ? data[0] : null, error: null })
              } catch (error) {
                console.error("Supabase ilike error:", error)
                resolve({ data: null, error })
              }
            },
          }),
          then: async (resolve: (result: { data: any[]; error: null }) => void) => {
            try {
              const encodedPattern = encodeURIComponent(pattern)
              const response = await fetch(
                `${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}=ilike.${encodedPattern}`,
                {
                  headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json",
                  },
                },
              )
              const data = await response.json()
              resolve({ data: data || [], error: null })
            } catch (error) {
              console.error("Supabase ilike error:", error)
              resolve({ data: [], error: null })
            }
          },
        }),
        order: (column: string, options?: { ascending?: boolean }) => ({
          then: async (resolve: (result: { data: any[]; error: null }) => void) => {
            try {
              const response = await fetch(
                `${supabaseUrl}/rest/v1/${table}?select=${columns}&order=${column}.${options?.ascending ? "asc" : "desc"}`,
                {
                  headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json",
                  },
                },
              )
              const data = await response.json()
              resolve({ data: data || [], error: null })
            } catch (error) {
              console.error("Supabase error:", error)
              resolve({ data: [], error: null })
            }
          },
        }),
        then: async (resolve: (result: { data: any[]; error: null }) => void) => {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}`, {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
              },
            })
            const data = await response.json()
            resolve({ data: data || [], error: null })
          } catch (error) {
            console.error("Supabase error:", error)
            resolve({ data: [], error: null })
          }
        },
      }),
      insert: (values: any) => ({
        select: (columns = "*") => ({
          single: () => ({
            then: async (resolve: (result: { data: any; error: any }) => void) => {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
                  method: "POST",
                  headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                  },
                  body: JSON.stringify(values),
                })

                if (response.ok) {
                  const data = await response.json()
                  resolve({ data: data && data.length > 0 ? data[0] : null, error: null })
                } else {
                  const errorText = await response.text()
                  let errorObj
                  try {
                    errorObj = JSON.parse(errorText)
                  } catch {
                    errorObj = { message: errorText }
                  }
                  resolve({ data: null, error: errorObj })
                }
              } catch (error) {
                console.error("Supabase insert error:", error)
                resolve({ data: null, error })
              }
            },
          }),
        }),
      }),
    }),
  }
}
