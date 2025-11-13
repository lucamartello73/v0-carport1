"use client"

interface ConfiguratorNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  isLastStep?: boolean
  nextButtonText?: string
  showNext?: boolean
}

export function ConfiguratorNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isLastStep = false,
  nextButtonText,
  showNext = true,
}: ConfiguratorNavigationProps) {
  const buttonText = nextButtonText || (isLastStep ? "Invia Preventivo" : "Avanti")
  
  return (
    <div className="navigation-buttons">
      {currentStep > 1 && (
        <button 
          onClick={onPrevious}
          className="btn btn-secondary"
          type="button"
        >
          Indietro
        </button>
      )}
      
      {showNext && (
        <button 
          onClick={onNext}
          className="btn btn-primary"
          type="button"
          style={currentStep === 1 ? { marginLeft: 'auto' } : undefined}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
