import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, schema } = await req.json();

  if (!schema) {
    return new Response("No schema provided", { status: 400 });
  }

  const appendedMessages = [
    {
      role: "system",
      content: ` Given the following SQL tables, your job is to write queries given a user’s request. Don't provide any comment, just the query.
     ${schema}`,
    },
    ...messages,
  ];

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    // const response = await openai.createCompletion({
    // model: "text-davinci-003",
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0,
    messages: appendedMessages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
