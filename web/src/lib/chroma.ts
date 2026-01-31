import { ChromaClient } from "chromadb";
import { OpenAIEmbeddings } from "@langchain/openai";

// Initialize Chroma Client
// Note: This requires a running ChromaDB instance at http://localhost:8000
const chroma = new ChromaClient({
    path: process.env.CHROMA_DB_URL || "http://localhost:8000",
});

// Initialize Embeddings
// Note: This requires OPENAI_API_KEY in environment variables
export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
});

export const getCollection = async (collectionName: string) => {
    try {
        return await chroma.getOrCreateCollection({
            name: collectionName,
        });
    } catch (error) {
        console.error("Error connected to ChromaDB:", error);
        return null;
    }
};

export const addDocumentToVectorStore = async (
    collectionName: string,
    text: string,
    metadata: Record<string, string | number | boolean>
) => {
    const collection = await getCollection(collectionName);
    if (!collection) return;

    // Generate ID
    const id = `doc-${Date.now()}`;

    // In a real scenario, we would generate embeddings here if not using Chroma's default
    // For this setup, we assume Chroma's default embedding function or we pass embeddings

    await collection.add({
        ids: [id],
        metadatas: [metadata],
        documents: [text],
    });

    return id;
};

export const searchVectorStore = async (query: string, collectionName: string) => {
    const collection = await getCollection(collectionName);
    if (!collection) return [];

    const results = await collection.query({
        queryTexts: [query],
        nResults: 5,
    });

    return results;
};
