"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, Send, Sparkles } from 'lucide-react'
import axios from 'axios'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUI from './GroupSizeUI'
import BudgetUI from './BudgetUI'
import TripDurationUI from './TripDurationUI'
import FinalUI from './FinalUI'

type Message = {
    role: string,
    content: string,
    ui?: string,
}

function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [generatingItinerary, setGeneratingItinerary] = useState(false);
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

    const extractIntroAndItinerary = (raw: string) => {
        let intro = raw;
        let itinerary = '';

        const parts = raw.split(/\n\s*\n/);
        if (parts.length > 1) {
            intro = parts[0].trim();
            itinerary = parts.slice(1).join('\n\n').trim();
        } else {
            const dayMatch = raw.search(/\bDay\s*1\b[:\-.]?/i);
            if (dayMatch > 0) {
                intro = raw.slice(0, dayMatch).trim();
                itinerary = raw.slice(dayMatch).trim();
            } else {
                const firstSentenceMatch = raw.match(/([\s\S]*?\.["']?)(\s+[A-Z]|$)/);
                if (firstSentenceMatch && firstSentenceMatch[1] && firstSentenceMatch[1].length < raw.length - 20) {
                    intro = firstSentenceMatch[1].trim();
                    itinerary = raw.slice(intro.length).trim();
                } else {
                    intro = 'Perfect! I have all your details. Creating your personalized itinerary now...';
                    itinerary = raw.trim();
                }
            }
        }

        if ((itinerary?.length ?? 0) < 60) {
            const dayMatchFallback = raw.search(/\bDay\s*1\b[:\-.]?/i);
            if (dayMatchFallback > 0) {
                itinerary = raw.slice(dayMatchFallback).trim();
            }
        }

        if (itinerary === intro || /^let me create/i.test(itinerary)) {
            itinerary = '';
        }

        return { intro, itinerary };
    };

    const fetchItineraryFromApi = async (history: Message[]): Promise<string> => {
        try {
            const genPromptMsg: Message = {
                role: 'user',
                content: 'Please generate the complete, detailed day-by-day travel itinerary with daily morning, afternoon, and evening schedules, top sights, local dining options, and budget tips based on all my collected preferences.'
            };
            const res = await axios.post('/api/aimodel', { messages: [...history, genPromptMsg] });
            const reply = res?.data?.resp ?? '';
            return reply;
        } catch {
            return '';
        }
    };

    const onSend = async (messageText?: string) => {
        const textToSend = (messageText ?? userInput)?.trim();

        if (!textToSend || loading || generatingItinerary) return;

        const newMsg: Message = {
            role: "user",
            content: textToSend
        };

        const nextMessages = [...messagesRef.current, newMsg];
        messagesRef.current = nextMessages;
        setMessages(nextMessages);
        setUserInput("");
        setLoading(true);

        try {
            const result = await axios.post('/api/aimodel', { messages: nextMessages });

            const rawContent = result?.data?.resp || 'I could not generate a response right now.';
            const uiType = (result?.data?.ui ?? '').toLowerCase().trim();
            const isFinalFlag = uiType === 'final';

            const asksQuestion = /what('s| is) your|how many|who's joining|what level|which budget|what kind of/i.test(rawContent);
            const explicitItineraryGen = /(creating|generating|building|here is) (your|the) (personalized |custom |dream )?itinerary/i.test(rawContent);

            const isFinal = isFinalFlag || (explicitItineraryGen && !asksQuestion);

            if (isFinal) {
                let { intro, itinerary } = extractIntroAndItinerary(rawContent);

                if (!intro || intro.length < 5) {
                    intro = "Perfect! I have all the details needed to create your trip itinerary.";
                }

                // 1. Send Message 1 immediately WITH ui: 'final' (renders FinalUI component in message 1)
                const confirmationMsg: Message = { role: 'assistant', content: intro, ui: 'final' };
                const updatedWithIntro = [...nextMessages, confirmationMsg];
                messagesRef.current = updatedWithIntro;
                setMessages(updatedWithIntro);

                setLoading(false);

                // 2. Show separate spinner state while itinerary is generated
                setGeneratingItinerary(true);

                // Fetch or generate full detailed itinerary
                let fullItineraryText = await fetchItineraryFromApi(updatedWithIntro);
                if (!fullItineraryText || fullItineraryText.length < 60) {
                    fullItineraryText = itinerary || rawContent;
                }

                // 3. Clear spinner and send itinerary in a NEW, SEPARATE message
                setGeneratingItinerary(false);
                const itineraryMsg: Message = { role: 'assistant', content: fullItineraryText };
                const finalMessages = [...messagesRef.current, itineraryMsg];
                messagesRef.current = finalMessages;
                setMessages(finalMessages);
            } else {
                // Detect GenUI if model returned null/missing ui
                let detectedUi = result?.data?.ui;
                const textLower = rawContent.toLowerCase();

                if (!detectedUi || detectedUi === 'null' || detectedUi === 'none') {
                    if (textLower.includes('budget') || textLower.includes('spending') || textLower.includes('cost level') || textLower.includes('low, moderate, high')) {
                        detectedUi = 'budget';
                    } else if (textLower.includes("who's joining") || textLower.includes('group size') || textLower.includes('how many people') || textLower.includes('solo, couple, family, friends')) {
                        detectedUi = 'groupsize';
                    } else if (textLower.includes('how many days') || textLower.includes('trip duration') || textLower.includes('length of your trip') || textLower.includes('how long')) {
                        detectedUi = 'tripduration';
                    }
                }

                const assistantReply: Message = {
                    role: "assistant",
                    content: rawContent,
                    ui: detectedUi
                };
                const updatedMessages = [...nextMessages, assistantReply];
                messagesRef.current = updatedMessages;
                setMessages(updatedMessages);
                setLoading(false);
            }
        } catch (error) {
            console.error('Failed to generate response', error);
            const fallbackReply: Message = {
                role: "assistant",
                content: 'Sorry, something went wrong while generating your response. Please try again.'
            };
            const updatedMessages = [...nextMessages, fallbackReply];
            messagesRef.current = updatedMessages;
            setMessages(updatedMessages);
            setLoading(false);
            setGeneratingItinerary(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void onSend();
        }
    };

    const RenderGenerativeUI = (ui: string) => {
        const normalizedUi = ui?.toLowerCase().trim();

        if (normalizedUi === "budget") {
            return <BudgetUI onSelectedOption={(v: string) => {
                setUserInput(v);
                void onSend(v);
            }} />
        }
        else if (normalizedUi === "groupsize") {
            return <GroupSizeUI onSelectedOption={(v: string) => {
                setUserInput(v);
                void onSend(v);
            }} />
        }
        else if (normalizedUi === "tripduration") {
            return <TripDurationUI onSelectedOption={(v: string) => {
                setUserInput(v);
                void onSend(v);
            }} />
        }
        return null;
    };

    return (
        <div className="h-[77vh] flex flex-col">
            {messages?.length === 0 &&
                <EmptyBoxState onSelectOption={(value: string) => {
                    setUserInput(value);
                }} />
            }
            {/* Display Messages */}
            <section className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg: Message, index) => {
                    const nextMessage = messages[index + 1];
                    const hasUserResponseFollowing = nextMessage?.role === 'user';
                    const shouldRenderUi = msg.role === 'assistant' && !!msg.ui && !hasUserResponseFollowing;

                    return msg.role === 'user' ? (
                        <div className="flex justify-end mt-2" key={index}>
                            <div className="max-w-lg bg-primary text-white px-4 py-2.5 rounded-2xl shadow-xs">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-start mt-2" key={index}>
                            <div className="max-w-xl bg-muted/60 border border-border/40 text-foreground px-4 py-3 rounded-2xl shadow-xs whitespace-pre-wrap leading-relaxed">
                                {msg.content}
                                {shouldRenderUi ? RenderGenerativeUI(msg.ui ?? '') : null}
                                {/sorry|could not generate|something went wrong|please try again/i.test(msg.content) && (() => {
                                    let prevUser: string | undefined = undefined;
                                    for (let i = index - 1; i >= 0; i--) {
                                        if (messages[i].role === 'user') { prevUser = messages[i].content; break; }
                                    }

                                    return (
                                        <div className="mt-3">
                                            <Button
                                                onClick={() => void onSend(prevUser)}
                                                disabled={!prevUser || loading || generatingItinerary}
                                                className="bg-primary text-white"
                                            >
                                                Try again
                                            </Button>
                                        </div>
                                    )
                                })()}
                            </div>
                        </div>
                    )
                })}

                {/* Loading indicator for regular messages */}
                {loading && !generatingItinerary && (
                    <div className="flex justify-start mt-2">
                        <div className="max-w-lg bg-muted/60 border border-border/40 text-foreground px-4 py-3 rounded-2xl flex items-center gap-2">
                            <Loader className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                    </div>
                )}

                {/* Dedicated spinner state while generating final itinerary */}
                {generatingItinerary && (
                    <div className="flex justify-start mt-2">
                        <div className="max-w-md bg-primary/5 border border-primary/20 p-4 rounded-2xl shadow-sm flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <Loader className="h-4 w-4 text-primary animate-spin" />
                                    <p className="text-sm font-semibold text-foreground">Creating your itinerary...</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Generating recommendations, daily activities & budget tips</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* User Input */}
            <section className="pt-2">
                <div className="border border-border/60 rounded-2xl p-4 shadow-lg bg-card/50 backdrop-blur-sm relative transition-all focus-within:ring-2 focus-within:ring-primary/20">
                    <Textarea
                        placeholder="Start typing here..."
                        className="w-full h-24 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
                        onChange={(event) => setUserInput(event.target.value ?? '')}
                        onKeyDown={handleKeyDown}
                        value={userInput}
                        disabled={loading || generatingItinerary}
                    />
                    <Button
                        type="button"
                        size={'icon'}
                        onClick={() => void onSend()}
                        disabled={loading || generatingItinerary || !userInput.trim()}
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