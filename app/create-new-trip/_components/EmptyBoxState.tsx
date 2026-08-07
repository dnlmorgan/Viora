import React from 'react'
import { suggestions } from '@/app/_components/Hero'

function EmptyBoxState({onSelectOption}: {onSelectOption: (option: string) => void}) {
  return (
    <div className="mt-7">
        <h2 className="text-3xl font-bold text-center">Start Planning a <span className="text-primary">New Trip!</span></h2>
        <p className="text-center text-muted-foreground mt-2">
            Describe your ideal trip to create a personalized itinerary.
        </p>

        <div className="flex flex-wrap gap-5 justify-center pt-5 flex-col">
            {suggestions.map((suggestion, index) => (
                <div
                  key={index} 
                  onClick={() => onSelectOption(suggestion.prompt)}
                  className="flex items-center gap-2 border border-border/80 rounded-xl p-3 cursor-pointer bg-background hover:border-primary hover:text-primary transition-all shadow-xs text-sm font-medium"
                >
                    {suggestion.icon}
                    <span className="text-lg">{suggestion.title}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EmptyBoxState