interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

interface ConfigurationEmailData {
  customerName: string
  customerEmail: string
  configurationId: string
  totalPrice: number
  structureType: string
  dimensions: string
}

export async function sendEmail(emailData: EmailData) {
  const apiKey = process.env.SENDWITH_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL || "admin@carport.com"

  if (!apiKey) {
    console.error("SENDWITH_API_KEY not configured")
    return { success: false, error: "Email service not configured" }
  }

  try {
    const requestBody = {
      message: {
        to: [
          {
            email: emailData.to,
            name: emailData.to.split("@")[0],
          },
        ],
        from: {
          email: emailData.from || adminEmail,
          name: "Carport Configurator",
        },
        subject: emailData.subject,
        body: emailData.html.replace(/<[^>]*>/g, "").trim(), // Simple HTML tag removal only
      },
    }

    console.log("[v0] SendWith request body:", JSON.stringify(requestBody, null, 2))

    const response = await fetch("https://www.sendwith.email/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    const responseText = await response.text()
    console.log("[v0] SendWith response:", response.status, responseText)

    if (!response.ok) {
      console.error(`SendWith API error: ${response.status} ${response.statusText}`, responseText)
      throw new Error(`SendWith API error: ${response.statusText} - ${responseText}`)
    }

    // Try to parse as JSON
    let result
    try {
      result = JSON.parse(responseText)
    } catch (jsonError) {
      // If it's not JSON, treat as success if status is OK
      result = { message: responseText }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendConfigurationNotification(data: ConfigurationEmailData) {
  const customerEmailText = `Grazie ${data.customerName}! Abbiamo ricevuto la tua configurazione carport (ID: ${data.configurationId}). Ti contatteremo presto.`

  const adminEmailText = `Nuova configurazione da ${data.customerName} (${data.customerEmail}). ID: ${data.configurationId}`

  // Send email to customer
  const customerResult = await sendEmail({
    to: data.customerEmail,
    subject: "Configurazione Carport Ricevuta",
    html: customerEmailText,
  })

  // Send notification to admin
  const adminResult = await sendEmail({
    to: process.env.ADMIN_EMAIL || "admin@carport.com",
    subject: `Nuova Configurazione - ${data.customerName}`,
    html: adminEmailText,
  })

  return {
    customerEmail: customerResult,
    adminEmail: adminResult,
  }
}
