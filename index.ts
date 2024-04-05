import { ChatOpenAI } from "@langchain/openai";

// Assuming `invoke` returns a Promise of a specific type, you might need to define that type or use any if unknown.
// For better type accuracy, replace `any` with the actual response type you expect.
const chatModel = new ChatOpenAI({
  // openAIApiKey: process.env.OPENAI_API_KEY as string, // Cast to string; TypeScript won't automatically infer process.env types.
});

const main = async (): Promise<void> => {
  const response: any = await chatModel.invoke("Tell me a story about Johnny McGory");
  console.log(response.content);
};

main();
