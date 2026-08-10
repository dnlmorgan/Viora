import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by gathering information about their preferences step by step.

CRITICAL INSTRUCTIONS:
1. EXTRACT information from the user's messages - do NOT re-ask for details already provided.
2. Keep track of what information you have collected across the conversation.
3. Only ask for MISSING details from this list:
   - Starting location (source) -> set ui: null
   - Destination city or country -> set ui: null
   - Group size (Solo, Couple, Family, Friends) -> YOU MUST SET ui: "groupSize"
   - Budget (Low, Medium, High) -> YOU MUST SET ui: "budget"
   - Trip duration (number of days) -> YOU MUST SET ui: "tripDuration"
   - Travel interests (e.g., adventure, sightseeing, food) -> set ui: null

4. Ask only ONE question at a time for missing information.
5. If asking about group size, you MUST set "ui": "groupSize".
6. If asking about budget, you MUST set "ui": "budget".
7. If asking about trip duration or number of days, you MUST set "ui": "tripDuration".
8. ONLY set "ui": "final" when ALL required details (destination, duration, group size, budget) have been gathered and you are ready to create the final itinerary. Do NOT set ui: "final" while still asking for missing details.

Always respond in strict JSON format:
{
  "resp": "Your conversational response text here",
  "ui": "groupSize" | "budget" | "tripDuration" | "final" | null
}`;

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