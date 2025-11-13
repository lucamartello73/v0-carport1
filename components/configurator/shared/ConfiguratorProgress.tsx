"use client"

interface ConfiguratorProgressProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function ConfiguratorProgress({ 
  currentStep, 
  totalSteps, 
  stepTitle 
}: ConfiguratorProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)
  
  return (
    <div className="progress-section">
      <div className="progress-info">
        <span className="progress-step">
          Step {currentStep} di {totalSteps}: {stepTitle}
        </span>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
