import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { Globe2 } from 'lucide-react'
import { Plane } from 'lucide-react'
import { Landmark } from 'lucide-react'

const suggestions=[
    {
        title: 'Create New Trip',
        icon:<Globe2 className="text-blue-400 h-5 w-5" />
    },
    {
        title: 'Inspire Me',
        icon:<Plane className="text-green-500 h-5 w-5" />
    },
    {
        title: 'Discover Hidden Gems',
        icon:<Landmark className="text-orange-500 h-5 w-5" />
    },
    {
        title: 'Adventure Destination',
        icon:<Globe2 className="text-yellow-600 h-5 w-5" />
    }
]

function Hero() {
  return (
    <div className="mt-24 w-full flex items-center justify-center">
        {/* Content */}
        <div className="max-w-3xl w-full text-center space-y-6">
            <h1 className="text-xl md:text-5xl font-bold">Your AI travel <span className="text-primary">companion.</span></h1>
            <p className="text-lg">Plan smarter. Travel better. Anywhere, effortlessly.</p>
        {/* Input Box */}
        <div>
            <div className="border rounded-2xl p-4 shadow relative">
                <Textarea placeholder="Describe your ideal trip..." 
                className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                />
                <Button size={'icon'} className="absolute right-6 bottom-6">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
        
        {/* Suggestions List */}
        <div className="flex gap-5 justify-center">
            {suggestions.map((suggestion, index)=>(
                <div key={index} className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:text-white hover:bg-primary">
                    {suggestion.icon}
                    <h2 className="text-sm">{suggestion.title}</h2>
                </div>
            ))}
        </div>


        {/* Video Section */}
        </div>
    </div>
  )
}

export default Hero