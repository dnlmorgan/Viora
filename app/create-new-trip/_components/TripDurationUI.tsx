import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

function TripDurationUI({onSelectedOption}: any) {
  const [days, setDays] = useState<number>(3);

  const handleDecrease = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  const handleIncrease = () => {
    setDays(days + 1);
  };

  const handleConfirm = () => {
    onSelectedOption(`${days} Days`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">How many days do you want to travel?</h2>
      
      <div className="flex items-center gap-8 mb-6">
        <button
          onClick={handleDecrease}
          className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg text-2xl font-bold transition-all"
        >
          −
        </button>
        
        <div className="text-4xl font-bold min-w-30 text-center">
          {days} Days
        </div>
        
        <button
          onClick={handleIncrease}
          className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg text-2xl font-bold transition-all"
        >
          +
        </button>
      </div>
      
      <Button
        onClick={handleConfirm}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg"
      >
        Confirm
      </Button>
    </div>
  )
}

export default TripDurationUI
