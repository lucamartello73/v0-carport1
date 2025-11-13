"use client"

import { useState, useCallback, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Import componenti shared Design System
import { ConfiguratorHeader } from "@/components/configurator/shared/ConfiguratorHeader"
import { ConfiguratorProgress } from "@/components/configurator/shared/ConfiguratorProgress"
import { ConfiguratorNavigation } from "@/components/configurator/shared/ConfiguratorNavigation"

// Import step components per configuratore Acciaio
import { Step1StructureType } from "@/components/configurator/acciaio/step1-structure-type"
import { Step2Model } from "@/components/configurator/acciaio/step2-model"
import { Step3Dimensions } from "@/components/configurator/acciaio/step3-dimensions"
import { Step4Coverage } from "@/components/configurator/acciaio/step4-coverage"
import { Step5Colors } from "@/components/configurator/acciaio/step5-colors"
import { Step6Surface } from "@/components/configurator/acciaio/step6-surface"
import { Step7Package } from "@/components/configurator/acciaio/step7-package"

import type { ConfigurationData } from "@/types/configuration"
import { FooterMartello1930 } from "@/components/footer-martello1930"

import { initializeGoogleAnalytics, trackConfiguratorStep, setupAbandonTracking } from "@/lib/analytics/gtag"

export type { ConfigurationData }

const steps = [
  { id: 1, title: "Tipo Struttura", description: "Scegli il tipo di struttura", icon: "🏗️" },
  { id: 2, title: "Modello", description: "Seleziona il modello", icon: "📐" },
  { id: 3, title: "Dimensioni", description: "Imposta le dimensioni", icon: "📏" },
  { id: 4, title: "Copertura", description: "Scegli la copertura", icon: "🏠" },
  { id: 5, title: "Colori", description: "Seleziona i colori RAL", icon: "🎨" },
  { id: 6, title: "Superficie", description: "Scegli la superficie", icon: "🔲" },
  { id: 7, title: "Pacchetto", description: "Finalizza e invia", icon: "📦" },
]

export default function ConfiguratorAcciaioPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [configuration, setConfiguration] = useState<Partial<ConfigurationData>>({
    configuratorType: 'acciaio',
  })
  const [validationError, setValidationError] = useState<string>("")
  const [showValidationError, setShowValidationError] = useState(false)

  useEffect(() => {
    initializeGoogleAnalytics("G-8BW6WP9PR1")
    trackConfiguratorStep(`acciaio_step_${currentStep}_${steps[currentStep - 1].title.toLowerCase().replace(/ /g, "_")}`)
    const cleanup = setupAbandonTracking(
      () => `acciaio_step_${currentStep}_${steps[currentStep - 1].title.toLowerCase().replace(/ /g, "_")}`,
    )
    return cleanup
  }, [])

  useEffect(() => {
    if (currentStep > 1) {
      const stepName = `acciaio_step_${currentStep}_${steps[currentStep - 1].title.toLowerCase().replace(/ /g, "_")}`
      trackConfiguratorStep(stepName, {
        previous_step: currentStep - 1,
        configuration_progress: Math.round((currentStep / 7) * 100),
        configurator_type: 'acciaio',
      })
    }
  }, [currentStep])

  const validateCurrentStep = (): { valid: boolean; error: string } => {
    switch (currentStep) {
      case 1:
        if (!configuration.structureTypeId && !configuration.structureType) {
          return { valid: false, error: "⚠️ Seleziona un tipo di struttura per proseguire" }
        }
        break
      case 2:
        if (!configuration.modelId) {
          return { valid: false, error: "⚠️ Seleziona un modello per proseguire" }
        }
        break
      case 3:
        if (!configuration.width || !configuration.depth || !configuration.height) {
          return { valid: false, error: "⚠️ Inserisci tutte le dimensioni (larghezza, profondità, altezza)" }
        }
        if (configuration.width < 200 || configuration.depth < 300 || configuration.height < 180) {
          return { valid: false, error: "⚠️ Le dimensioni inserite sono troppo piccole. Verifica i valori minimi." }
        }
        break
      case 4:
        if (!configuration.coverageId) {
          return { valid: false, error: "⚠️ Seleziona un tipo di copertura per proseguire" }
        }
        break
      case 5:
        if (!configuration.structureColor) {
          return { valid: false, error: "⚠️ Seleziona un colore per la struttura" }
        }
        break
      case 6:
        break
    }
    return { valid: true, error: "" }
  }

  const updateConfiguration = useCallback((data: Partial<ConfigurationData>) => {
    setConfiguration((prev) => ({ ...prev, ...data }))
  }, [])

  const handleNext = () => {
    const validation = validateCurrentStep()
    if (!validation.valid) {
      setValidationError(validation.error)
      setShowValidationError(true)
      setTimeout(() => setShowValidationError(false), 5000)
      return
    }

    setShowValidationError(false)
    setValidationError("")

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setShowValidationError(false)
      setValidationError("")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleValidationError = (error: string) => {
    setValidationError(error)
    setShowValidationError(true)
    setTimeout(() => setShowValidationError(false), 5000)
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1StructureType configuration={configuration} updateConfiguration={updateConfiguration} />
      case 2:
        return <Step2Model configuration={configuration} updateConfiguration={updateConfiguration} />
      case 3:
        return <Step3Dimensions configuration={configuration} updateConfiguration={updateConfiguration} />
      case 4:
        return <Step4Coverage configuration={configuration} updateConfiguration={updateConfiguration} />
      case 5:
        return <Step5Colors configuration={configuration} updateConfiguration={updateConfiguration} />
      case 6:
        return <Step6Surface configuration={configuration} updateConfiguration={updateConfiguration} />
      case 7:
        return (
          <Step7Package
            configuration={configuration}
            updateConfiguration={updateConfiguration}
            onValidationError={handleValidationError}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-surface-beige">
      <ConfiguratorHeader 
        title="Configuratore Acciaio"
        subtitle="Progetta la tua struttura in acciaio personalizzata"
      />

      <main className="container-configurator">
        <ConfiguratorProgress 
          currentStep={currentStep}
          totalSteps={steps.length}
          progress={progress}
          stepTitle={steps[currentStep - 1].title}
          stepIcon={steps[currentStep - 1].icon}
        />

        {showValidationError && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertDescription className="text-red-800">{validationError}</AlertDescription>
          </Alert>
        )}

        <div className="step-content">
          {renderStep()}
        </div>

        <ConfiguratorNavigation 
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </main>

      <FooterMartello1930 />
    </div>
  )
}
