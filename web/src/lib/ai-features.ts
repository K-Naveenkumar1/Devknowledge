import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { searchVectorStore } from "./chroma";

// ------------------------------------------------------------------
// Feature 1: AI Reasoning (Reasoning over Search) &
// Feature 2: Developer Intelligence (Code/Root Cause/Context)
// ------------------------------------------------------------------

const analysisPromptTemplate = `
You are Devora AI, an advanced technical assistant. 
Your goal is to provide deep, reasoning-based answers, not just search results.

Task:
Analyse the provided Context (Code, Jira Tickets, Docs, Chat Logs) and answer the Question.

Rules:
1. CITATIONS: Always cite your sources. Format: [Source: Title/ID].
2. REASONING: Explain *why* something is happening. Connect the dots.
   Example: "This error matches Jira-123, which was caused by PR-456 introducing a breaking change in auth logic."
3. ROOT CAUSE: If analyzing an error, trace the root cause based on the context.
4. DEPENDENCIES: Mention related modules or services if they appear in the context.

Context:
{context}

Question:
{question}

Analysis:
`;

const decisionMemoryPromptTemplate = `
You are a "Decision Memory" engine.
Your goal is to explain the historical context and "Why" behind a technical decision.

Task:
Review the linked Jira tickets, PR discussions, and Docs to summarize the decision process.

Rules:
1. Identify the PROBLEM that triggered the decision.
2. List ALTERNATIVES considered (if found in discussions).
3. State the FINAL DECISION and the primary rationale.
4. Link to key discussions.

Context:
{context}

Topic:
{topic}

Decision Summary:
`;

const model = new ChatOpenAI({
    modelName: "gpt-4-turbo",
    temperature: 0.1, // Low temp for factual reasoning
    openAIApiKey: process.env.OPENAI_API_KEY
});

// Generic analysis chain
export const analyzeContext = async (question: string, context: string) => {
    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(analysisPromptTemplate),
        model,
        new StringOutputParser(),
    ]);

    return await chain.invoke({
        question,
        context,
    });
};

// Feature 3: Decision Memory Chain
export const getDecisionContext = async (topic: string, context: string) => {
    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(decisionMemoryPromptTemplate),
        model,
        new StringOutputParser(),
    ]);

    return await chain.invoke({
        topic,
        context,
    });
};

// Feature 4: Duplicate Detection Logic
// This function would be called when a user types a new issue title
export const checkDuplicateIssue = async (newIssueText: string) => {
    // 1. Search Vector DB for similar content
    const similarDocs = await searchVectorStore(newIssueText, "issues");

    // 2. Simple threshold check (mocked logic for now as we need real embeddings score)
    // In a real implementation with LangChain + Chroma, we'd check usage of 'score' or 'distance'

    if (similarDocs && (similarDocs as any).ids && (similarDocs as any).ids.length > 0) {
        const docs = similarDocs as any;
        // Assume the first result is the most similar
        return {
            isDuplicate: true, // You'd use a similarity score threshold here
            existingIssueId: docs.ids[0],
            existingIssueTitle: docs.metadatas[0]?.title || "Unknown Issue",
            confidence: "High"
        };
    }

    return { isDuplicate: false };
};
