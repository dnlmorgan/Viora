'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, Globe2, Plane, Landmark, Sparkles } from 'lucide-react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'

const suggestions = [
    {
        title: 'Create New Trip',
        prompt: 'Create a 5-day itinerary for a scenic trip to Banff, Canada with outdoor activities and mountain views.',
        icon: <Globe2 className="text-blue-400 h-5 w-5" />
    },
    {
        title: 'Inspire Me',
        prompt: 'Give me 3 unique travel destinations for a relaxing weekend getaway with great food.',
        icon: <Plane className="text-emerald-500 h-5 w-5" />
    },
    {
        title: 'Discover Hidden Gems',
        prompt: 'Find off-the-beaten-path destinations in Kyoto, Japan including quiet temples and local street food spots.',
        icon: <Landmark className="text-amber-500 h-5 w-5" />
    },
    {
        title: 'Adventure Destination',
        prompt: 'Plan an action-packed 7-day adventure trip in Iceland featuring glaciers, waterfalls, and northern lights.',
        icon: <Sparkles className="text-purple-500 h-5 w-5" />
    }
]

function Hero() {
  const [userInput, setUserInput] = useState('');
  const router = useRouter();
  const { user } = useUser();

  const handleSuggestionClick = (prompt: string) => {
    setUserInput(prompt);
  };

  const handleSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    // TODO: dispatch the prompt to your AI/trip builder logic
    console.log('Send prompt:', userInput);
  };

  return (
    <div className="mt-16 md:mt-24 w-full flex flex-col items-center justify-center px-4">
        {/* Content */}
        <div className="max-w-3xl w-full text-center space-y-6">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight">
              Your AI travel <span className="text-primary bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">companion.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto">
              Plan smarter. Travel better. Anywhere, effortlessly.
            </p>

            {/* Input Box */}
            <div className="border border-border/60 rounded-2xl p-4 shadow-lg bg-card/50 backdrop-blur-sm relative transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <Textarea 
                  placeholder="Describe your ideal trip (e.g., 5 days in Tokyo for foodie lovers)..." 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
                />
                <Button
                  type="button"
                  size={'icon'}
                  onClick={handleSend}
                  className="absolute right-6 bottom-6 shadow-md hover:scale-105 transition-transform"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
            
            {/* Suggestions List */}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
                {suggestions.map((suggestion, index) => (
                    <button
                      key={index} 
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion.prompt)}
                      className="flex items-center gap-2 border border-border/80 rounded-full px-4 py-2 cursor-pointer bg-background hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xs text-sm font-medium"
                    >
                        {suggestion.icon}
                        <span>{suggestion.title}</span>
                    </button>
                ))}
            </div>

            {/* Video Showcase Section */}
            
        </div>
    </div>
  )
}

export default Hero