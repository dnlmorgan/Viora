import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by gathering information about their preferences.

CRITICAL INSTRUCTIONS:
1. EXTRACT information from the user's messages - do NOT re-ask for details already provided
2. Keep track of what information you have collected across the conversation
3. Only ask for MISSING details from this list:
   - Starting location (source) - NO UI
   - Destination city or country - NO UI
   - Group size (Solo, Couple, Family, Friends) - Use UI: "groupSize"
   - Budget (Low, Medium, High) - Use UI: "budget"
   - Trip duration (number of days) - Use UI: "tripDuration"
   - Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) - NO UI
   - Special requirements or preferences (if any) - NO UI

4. Ask only ONE relevant question at a time for missing information
5. If user already mentioned an item (even in passing), acknowledge it and don't re-ask
6. Always maintain a conversational, interactive style
7. Once ALL required information is collected, generate the final itinerary with ui: "final"

IMPORTANT: Send UI only for groupSize, budget, and tripDuration. For all other questions, send ui: null or ui: "".

Always respond in strict JSON format:
{
  "resp": "Your conversational response text here",
  "ui": "groupSize|budget|tripDuration|final|null"
}`

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    try {
        const completion = await openai.chat.completions.create({
            model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
            response_format: {type:'json_object'},
            messages: [
                {
                    role: "system",
                    content: PROMPT
                },
            ...messages
            ],
        });

        const message = completion.choices[0]?.message;
        const rawContent = message?.content ?? '{}';

        try {
            return NextResponse.json(JSON.parse(rawContent));
        } catch {
            return NextResponse.json({
                resp: rawContent,
                ui: null
            });
        }
    }
    catch (e) {
        console.error('AI model request failed', e);
        return NextResponse.json({
            resp: 'Sorry, I could not generate a response right now. Please try again.',
            ui: null
        });
    }
}