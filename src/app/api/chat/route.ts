import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage } from 'ai';
import { JANISE_KNOWLEDGE, SYSTEM_PROMPT } from '@/lib/knowledge';

export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Convert UIMessage format to the format expected by streamText
    const formattedMessages = messages.map((msg: UIMessage) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.parts
            ?.filter((part): part is { type: 'text'; text: string } => part.type === 'text')
            .map((part) => part.text)
            .join('') || '',
    }));

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: `${SYSTEM_PROMPT}\n\nHere is information about Janise:\n${JANISE_KNOWLEDGE}`,
        messages: formattedMessages,
    });

    return result.toUIMessageStreamResponse();
}
