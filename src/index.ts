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
    [ 'system', `You are an educator trying to help a student improve their writing skills gradually over time. You have been given a chapter of a book a child is writing. Make up to 3 suggestions for improvements to the chapter based on the changes he has made. Give one overall comment about the direction the chapter is going. The data will be provide in the followning XML format

<edits>
  <changes>@CHANGES_TO_CHAPTER@</changes>
  <contents>@CHAPTER_CONTENTS_AFTER_CHANGES@</contents>
</edits>

where @CHANGES_TO_CHAPTER@ is a list of changes made to the chapter and @CHAPTER_CONTENTS_AFTER_CHANGES@ is the chapter contents after the changes have been made.

` ],
    [ 'user', `<edits>
  <changes>{changes}</changes>
  <contents>{contents}</contents>
</edits>` ],
  ])
  const chain = prompt.pipe(chatModel)
  const response: any = await chain.invoke({
    changes: `diff --git a/test/chapters/01.md b/test/chapters/01.md
index 32760aa..e230f71 100644
--- a/test/chapters/01.md
+++ b/test/chapters/01.md
@@ -1,6 +1,5 @@
 # Chapter 1

-
 This is a story about a subject that's so controversial it will shock my
 readers to the very core. That's right. This is a story about cheese.

@@ -8,9 +7,10 @@ Everyone hates cheese. It's true. Even so called cheese lovers, if they were
 truly being honest with themselves would have to admit it ... Cheese stinks.
 Strange as that may sound, this story is about a person who was in denial of
 their hatred of cheese. An aforementioned "cheese-lover" to the core. His name
-was Brian. As you may have guessed, his favourite type of cheese was Brie - and
+was Brian. He is a speckly-faced teenager of 16 years old. As you may have
+guessed, his favourite type of cheese was Brie - and
 I don't mean no fresh-off-the-shelf, garden variety Brie you'd find in your
-local supermarket. No, I'm talking about the smelliest, pongiest, stinkiest,
+local supermarket. No, I'm talking about the pongiest, stenchy,
 oldest Brie you could ever imagine.

 You see, when Brian was young he was introduced to cheese as part of a
@@ -19,5 +19,9 @@ out the Cheese platter just before desert and Brian would go delerious with
 delight. He would run around the table several times, shouting
 "cheesey-cheese-sneeze".  It was actually rather annoying for the rest of the
 family who found it particularily odd. At the time, nobody knew it but Brian as
-actually suffering fron a rare mental illness call chizyphreniosis. We all know
-someone who's had it but Brian was level 9 on th e chizyphreniosis spectrum.
+actually suffering from a rare mental illness called chizyphreniosis. We all
+know someone who's had it but Brian was level 9 on th e chizyphreniosis
+spectrum. No one knows how it started but it is true he once fell into a giant
+barrel of cheese fondu at 6 month of age while on a skiing trip in Switzerland.
+No, stupid. Obviously he wasn't the one skiing ... because I knew you would
+ask.
`,
    contents: ``

  })
  console.log(response.content);
};

const processArgs = () => {
  // Read all files in the chapter directory
}

main();
