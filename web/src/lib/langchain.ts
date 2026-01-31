import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize LLM
const model = new ChatOpenAI({
    modelName: "gpt-4-turbo",
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY
});

// Template for RAG (Retrieval Augmented Generation)
const answerTemplate = `You are a technical assistant for a developer.
Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}

Question: {question}

Helpful Answer:`;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

// LangChain Chain
export const generateAnswer = async (question: string, context: string) => {
    const chain = RunnableSequence.from([
        answerPrompt,
        model,
        new StringOutputParser(),
    ]);

    const response = await chain.invoke({
        question: question,
        context: context,
    });

    return response;
};
