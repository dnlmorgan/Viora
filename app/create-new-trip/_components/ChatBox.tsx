"use client"

import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

function ChatBox() {
  
  const onSend = () => {

  }

  return (
    <div className="h-[77vh] flex flex-col">
        {/* Display Messages */}
        <section className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-end mt-2">
                <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                    User message
                </div>
            </div>
            <div className="flex justify-start mt-2">
                <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                    AI agent message
                </div>
            </div>
        </section>
        {/* User Input */}
        <section>
            <div className="border border-border/60 rounded-2xl p-4 shadow-lg bg-card/50 backdrop-blur-sm relative transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <Textarea 
                  placeholder="Describe your ideal trip (e.g., 5 days in Tokyo for foodie lovers)..." 
                  className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
                />
                <Button
                  type="button"
                  size={'icon'}
                  onClick={onSend}
                  className="absolute right-6 bottom-6 shadow-md hover:scale-105 transition-transform"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </section>
    </div>
  )
}

export default ChatBox