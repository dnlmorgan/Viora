import React from 'react'
import { Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FinalUI() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded">
        <Globe2 className="text-primary text-4xl animate-bounce"/>
        <h2 className="text-lg font-semibold mt-4 text-primary">Your dream trip itinerary is on the way...</h2>
        <p className="text-sm text-muted-foreground mt-2 text-center">Generating the best destination recommendations for you.</p>
        <Button disabled className="mt-4 w-full ">View Trip</Button>
    </div>
  )
}

export default FinalUI