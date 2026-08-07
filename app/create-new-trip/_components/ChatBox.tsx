"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, Send } from 'lucide-react'
import axios from 'axios'
import EmptyBoxState from './EmptyBoxState'

type Message={
    role:string,
    content:string
}

function ChatBox() {
  
    const [messages,setMessages] = useState<Message[]>([]);
    const [userInput,setUserInput]=useState<string>('');
    const [loading,setLoading]=useState(false);
    const messagesRef = useRef<Message[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        const prompt = searchParams.get('prompt');

        if (prompt) {
            setUserInput(prompt);
            router.replace('/create-new-trip');
        }
    }, [router, searchParams]);

    const onSend = async(messageText?: string) => {
        const textToSend = (messageText ?? userInput)?.trim();

        if(!textToSend) return;
        if(loading) return;

        const newMsg:Message={
            role:"user",
            content:textToSend
        }

        const nextMessages = [...messagesRef.current, newMsg];
        messagesRef.current = nextMessages;
        setMessages(nextMessages);
        setUserInput("");
        setLoading(true);

        try {
            const result = await axios.post('/api/aimodel',{
                messages: nextMessages
            });

            const assistantReply = {
                role:"assistant",
                content: result?.data?.resp || 'I could not generate a response right now.'
            };

            const updatedMessages = [...nextMessages, assistantReply];
            messagesRef.current = updatedMessages;
            setMessages(updatedMessages);
        } catch (error) {
            console.error('Failed to generate response', error);
            const fallbackReply = {
                role:"assistant",
                content:'Sorry, something went wrong while generating your response. Please try again.'
            };
            const updatedMessages = [...nextMessages, fallbackReply];
            messagesRef.current = updatedMessages;
            setMessages(updatedMessages);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void onSend();
        }
    }

  return (
    <div className="h-[77vh] flex flex-col">
        {messages?.length==0 && 
            <EmptyBoxState onSelectOption={(value:string) => {
                setUserInput(value);
            }}/>
        }
        {/* Display Messages */}
        <section className="flex-1 overflow-y-auto p-4">
            {messages.map((msg: Message, index) => (
                msg.role === 'user' ? (
                    <div className="flex justify-end mt-2" key={index}>
                        <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                            {msg.content}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-start mt-2" key={index}>
                        <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                            {msg.content}
                        </div>
                    </div>
                )
            ))}

            {loading && (
                <div className="flex justify-start mt-2">
                    <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                        <Loader className="animate-spin"/>
                    </div>
                </div>
            )}

        </section>
        {/* User Input */}
        <section>
            <div className="border border-border/60 rounded-2xl p-4 shadow-lg bg-card/50 backdrop-blur-sm relative transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <Textarea 
                  placeholder="Start typing here..." 
                  className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
                  onChange={(event)=>setUserInput(event.target.value??'')}
                  onKeyDown={handleKeyDown}
                  value={userInput}
                  disabled={loading}
                />
                <Button
                  type="button"
                  size={'icon'}
                  onClick={() => void onSend()}
                  disabled={loading || !userInput.trim()}
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