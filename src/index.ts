import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const ARGS = {
  chapterDirectory: "test/chapters",
}

const main = async (): Promise<void> => {
  const chatModel = new ChatOpenAI({
    // openAIApiKey: process.env.OPENAI_API_KEY as string, // Cast to string; TypeScript won't automatically infer process.env types.
  });

  const embeddings = new OpenAIEmbeddings();
  /*
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  */
  processArgs()
  const prompt = ChatPromptTemplate.fromMessages([
    [ 'system', 'You are an educator trying to help a student improve their writing skills gradually over time.' ],
    [ 'user', '{input}' ],
  ])
  const chain = prompt.pipe(chatModel)
  const response: any = await chain.invoke({
    input: "A long long time ago I was just a boy with a puppy inthe fiedls"
  })
  console.log(response.content);
};

const processArgs = () => {}

main();
