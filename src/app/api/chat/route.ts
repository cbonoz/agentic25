import { HumanMessage } from '@langchain/core/messages';
import { getAgent } from '../agent';
import { NextRequest } from 'next/server';
import { BusinessCommand, BusinessCommands, ChatResponse } from '@/lib/types';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

function extractCommand(text: string): ChatResponse {
  const lowercaseText = text.toLowerCase();

  for (const cmd of BusinessCommands) {
    if (cmd.keywords.some(keyword => lowercaseText.includes(keyword))) {
      const amount = cmd.regex ? text.match(cmd.regex)?.[1] : undefined;
      return {
        command: cmd.command,
        amount,
        message: text
      };
    }
  }

  return { message: text };
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Initialize agent with configuration
    const { agent, config } = await getAgent();

    // Process message through agent and get stream
    const stream = await agent.stream(
      { messages: [new HumanMessage(lastMessage.content)] },
      config
    );

    // Create async generator for streaming response
    const textStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if ('agent' in chunk) {
              const response = extractCommand(chunk.agent.messages[0].content);
              controller.enqueue(JSON.stringify(response));
            } else if ('tools' in chunk) {
              // Handle tool outputs if needed
              console.log('Tool output:', chunk.tools.messages[0].content);
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return streaming response
    return new Response(textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat message' }),
      { status: 500 }
    );
  }
}
