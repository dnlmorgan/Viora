import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an Al Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final), where Final means Al generating complete final output.
Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
{
resp:'Text Resp',
ui:"budget/groupSize/TripDuration/Final)'
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
                ui: 'Final'
            });
        }
    }
    catch (e) {
        console.error('AI model request failed', e);
        return NextResponse.json({
            resp: 'Sorry, I could not generate a response right now. Please try again.',
            ui: 'Final'
        });
    }
}