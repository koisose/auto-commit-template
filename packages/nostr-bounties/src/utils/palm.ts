import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.GOOGLE_API_KEY;


const client = new DiscussServiceClient({
    // @ts-ignore
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

export async function palm(content:string) {
    const result = await client.generateMessage({
        model: MODEL_NAME, // Required. The model to use to generate the result.
        temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
        candidateCount: 1, // Optional. The number of candidate results to generate.
        prompt: {
            // optional, preamble context to prime responses
            context: "Respond to all questions as JSON object",
            // Optional. Examples for further fine-tuning of responses.
            examples: [
                {
                    input: { content: "create a design for my website for $30 deadline is 5 day from now" },
                    output: {
                        content:
              `{"description":"create a design for my website","price":30,"currency":"USD","deadline":5,"unit":"day"}`,
                    },
                },
                ],
            // Required. Alternating prompt/response messages.
            messages: [{ content }],
        },
    });
    // @ts-ignore
    return result[0].candidates[0].content;
}

